import { Events } from "../models/fields.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

const adminForm = asyncHandler( async( req,res ) => {
    console.log("In adminForm");

    const { name,description,teamsize,fields } = req.body

    if( ([name,description,teamsize].some( (f) => f.trim() === "" )) || fields.length === 0 ){
        console.log("All fields not entered");
        return res.send("Invalid")
    }

    console.log("PROMISE",name,description,teamsize,fields);
    // console.log("PROMISE",name,description,fields);

    const putFields = await Events.create({name,description,teamsize,fields})

    if (!putFields) {
        console.log("Not putFields");
    }

    if(putFields.fields.type === "link"){
        const image = req?.file?.path
        console.log(`Image and form recieved ${image}`);

        const cloudinary = await uploadOnCloudinary(image)
        console.log(`Cloudinary url ${cloudinary}`);

        putFields.fields.url = cloudinary.secure_url

        await putFields.save()
    }

    const getFields = await Events.findById(putFields._id)

    if(!getFields){
        console.log("Not getFields");
    }

    console.log("Event added and fetched ", getFields);

    return res 
    .status(200)
    .json(getFields)
} )

const getEvents = asyncHandler( async(req, res) => {
    const events = await Events.find({});
    console.log(events);
    return res
    .status(200)
    .json(events)
})

export { adminForm, getEvents }