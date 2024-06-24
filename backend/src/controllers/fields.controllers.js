import { Events } from "../models/fields.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const adminForm = asyncHandler( async( req,res ) => {
    console.log("In adminForm");

    const { name,description,fields } = req.body

    if( ([name,description].some( (f) => f.trim() === "" )) || fields.length === 0 ){
        console.log("All fields not entered");
        return res.send("Invalid")
    }

    console.log("PROMISE",name,description,fields);

    const putFields = await Events.create({name,description,fields})

    if (!putFields) {
        console.log("Not putFields");
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

export { adminForm }