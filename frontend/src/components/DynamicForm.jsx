import React, { useState, useEffect } from 'react';

// Dummy form data to mimic fetched data
const dummyFormData = {
    name: 'Sample Form',
    description: 'This is a sample form description.',
    fields: [
        { label: 'Name', type: 'text', required: true },
        { label: 'Email', type: 'text', required: true },
        { label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'] }
    ]
};

const DynamicForm = () => {
    const [form, setForm] = useState({});
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Mimic fetching form data
        setForm(dummyFormData);
    }, []);

    const handleInputChange = (fieldLabel, value) => {
        setFormData({
            ...formData,
            [fieldLabel]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        // Handle form submission (e.g., send data to backend)
    };

    if (!form.name) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-black border border-white shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-6 text-green-700">{form.name}</h2>
                <p className="text-lg mb-6 text-gray-300">{form.description}</p>
                <form onSubmit={handleSubmit}>
                    {form.fields.map((field, index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-orange-700 mb-2 text-lg font-semibold">{field.label}</label>
                            {field.type === 'text' && (
                                <input
                                    type="text"
                                    className="w-full p-3 text-black border border-gray-300 rounded"
                                    required={field.required}
                                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                                />
                            )}
                            {field.type === 'select' && (
                                <select
                                    className="w-full p-3 text-black border border-gray-300 rounded"
                                    required={field.required}
                                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                                >
                                    {field.options.map((option, optionIndex) => (
                                        <option key={optionIndex} value={option}>{option}</option>
                                    ))}
                                </select>
                            )}
                            {/* Add more field types as needed */}
                        </div>
                    ))}
                    <button type="submit" className="bg-purple-700 text-white py-2 px-6 rounded text-lg font-bold">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DynamicForm;
