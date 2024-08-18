import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateFormFields = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState([]);
    const [formName, setFormName] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formTeamSize, setFormTeamSize] = useState('')

    const handleAddField = () => {
        setFields([...fields, { label: '', type: 'text', required: false, options: [] }]);
    };

    const handleFieldChange = (index, event) => {
        const { name, value, type, checked } = event.target;
        const newFields = fields.slice();
        if (name === 'required') {
            newFields[index][name] = checked;
        } else {
            newFields[index][name] = value;
        }
        setFields(newFields);
    };

    const handleOptionChange = (index, optionIndex, event) => {
        const newFields = fields.slice();
        newFields[index].options[optionIndex] = event.target.value;
        setFields(newFields);
    };

    const handleAddOption = (index) => {
        const newFields = fields.slice();
        newFields[index].options.push('');
        setFields(newFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const toPass = { name: formName, description: formDescription, teamsize: formTeamSize, fields }
    
            const FormRes = await fetch( "http://localhost:8000/api/create-form", {
                method:"POST",
                credentials: 'include',
                headers: {"Content-type":"application/json"},
                body: JSON.stringify( toPass )
            } )

            if(!FormRes.ok){
                console.log("Form not created");
            }
            navigate('/Events');
            console.log(FormRes.data);
    
        } catch (error) {
            console.log(error);
        }
        const formTemplate = {
            name: formName,
            description: formDescription,
            fields: fields
        };
        console.log(formTemplate);
        // Submit formTemplate to the server here
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-black border border-white shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-6 text-green-700">Create Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-orange-700 mb-2 text-lg font-semibold">Event Name</label>
                        <input
                            type="text"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            className="w-full p-3 text-black border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-orange-700 mb-2 text-lg font-semibold">Event Description</label>
                        <input
                            type="text"
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                            className="w-full p-3 text-black border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-orange-700 mb-2 text-lg font-semibold">Maximum team size</label>
                        <select
                            className="w-full p-3 text-black border border-gray-300 rounded"
                            onChange={(e) => setFormTeamSize(e.target.value)}
                            required
                        >
                            <option key='1' value='1'>1</option>
                            <option key='2' value='2'>2</option>
                            <option key='3' value='3'>3</option>
                            <option key='4' value='4'>4</option>
                            <option key='5' value='5'>5</option>
                            <option key='6' value='6'>6</option>
                        </select>
                    </div>
                    {fields.map((field, index) => (
                        <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
                            <div className="mb-2">
                                <label className="block text-purple-700 mb-1 text-lg font-semibold">Field Label</label>
                                <input
                                    type="text"
                                    name="label"
                                    value={field.label}
                                    onChange={(event) => handleFieldChange(index, event)}
                                    className="w-full p-3 text-black border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-purple-700 mb-1 text-lg font-semibold">Field Type</label>
                                <select
                                    name="type"
                                    value={field.type}
                                    onChange={(event) => handleFieldChange(index, event)}
                                    className="w-full p-3 text-black border border-gray-300 rounded"
                                >
                                    <option value="text">Text</option>
                                    <option value="select">Select</option>
                                    {/* Add other field types as needed */}
                                </select>
                            </div>
                            <div className="mb-2 flex items-center">
                                <input
                                    type="checkbox"
                                    name="required"
                                    checked={field.required}
                                    onChange={(event) => handleFieldChange(index, event)}
                                    className="mr-2"
                                />
                                <label className="text-purple-700 text-lg font-semibold">Required</label>
                            </div>
                            {field.type === 'select' && (
                                <div className="mb-2">
                                    <label className="block text-purple-700 mb-1 text-lg font-semibold">Options</label>
                                    {field.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="mb-1 flex items-center">
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(event) => handleOptionChange(index, optionIndex, event)}
                                                className="w-full p-3 text-black border border-gray-300 rounded"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => handleAddOption(index)}
                                        className="text-green-700 text-lg font-semibold"
                                    >
                                        Add Option
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="flex justify-between">
                        <button type="button" onClick={handleAddField} className="bg-green-700 text-white py-2 px-6 rounded text-lg font-bold">
                            Add Field
                        </button>
                        <button type="submit" className="bg-purple-700 text-white py-2 px-6 rounded text-lg font-bold">
                            Create Form
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateFormFields;
