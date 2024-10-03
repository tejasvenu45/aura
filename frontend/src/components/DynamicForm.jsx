import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    const api = import.meta.env.VITE_BASE_URL;

    const [form, setForm] = useState(null);
    const [formData, setFormData] = useState({});
    const { id } = useParams();

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${api}/api/response/${id}`, {
                    method: "GET",
                    credentials: "include"
                });

                if (!response.ok) {
                    console.log("Form not received");
                    return;
                }

                const data = await response.json();
                console.log("DATA", data)
                setForm(data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (fieldLabel, value) => {
        setFormData({
            ...formData,
            [fieldLabel]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
try {
    
            const toPass = { responses: formData }
            
            const response = await fetch( `${api}/api/response/${id}`, {
                method: "POST",
                credentials: "include",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(toPass)
            } )

            if (!response.ok) {
                console.log("Response not recorded");
            }

            console.log(response.data);
            navigate('/Events');

} catch (error) {
    console.log(error);
}
        // Handle form submission (e.g., send data to backend)
    };

    if (!form) {
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
