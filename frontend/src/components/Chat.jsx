
import React, { useState } from "react";
import Admin1 from "./assets/about/Hand.png"; 
import Admin2 from "./assets/about/Hand.png"; 
import Admin3 from "./assets/about/Hand.png"; 
import Admin4 from "./assets/about/Hand.png"; 

const admins = [
  { id: 1, name: "Admin 1", image: Admin1 },
  { id: 2, name: "Admin 2", image: Admin2 },
  { id: 3, name: "Admin 3", image: Admin3 },
  { id: 4, name: "Admin 4", image: Admin4 },
];

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [messageId, setmessageId] = useState(0);
  const [selectedAdmin, setSelectedAdmin] = useState(admins[0]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.trim() !== "") {
      setMessages([...messages, { admin: selectedAdmin.name, text: input }]);
      setInput("");
    }
    setmessageId((prev) => prev + 1);
    console.log(messages, messageId, input);
    try {
      const res = await fetch("http://localhost:8000/api/questionPublic", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ question: input, admin: selectedAdmin.name }),
      });

      if (!res.ok) {
        console.log("Error!!!! ");
      }
      console.log("Success! ", res);
    } catch (error) {
      console.log("Error in fetch ", error);
    }
  };

  return (
    <>
      <div className="bg-gray-900 w-full h-screen text-white font-mono">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex justify-center space-x-4 mb-8">
            {admins.map((admin) => (
              <div
                key={admin.id}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedAdmin.id === admin.id ? "bg-green-700" : "bg-gray-800"
                }`}
                onClick={() => setSelectedAdmin(admin)}
              >
                <img
                  src={admin.image}
                  alt={admin.name}
                  className="w-20 h-20 rounded-full mb-2"
                />
                <div>{admin.name}</div>
              </div>
            ))}
          </div>
          <div
            className="bg-gray-800 p-4 rounded-lg shadow-lg"
            style={{ height: "60%", overflowY: "scroll", width: "90%" }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`my-2 px-4 py-2 rounded-lg ${
                  message.admin === selectedAdmin.name
                    ? "bg-green-700"
                    : "bg-gray-700"
                } text-white`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="w-3/4 mt-4 flex flex-row">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="You: "
              className="rounded-lg border border-gray-800 bg-gray-800 text-white px-4 py-2 w-full focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg ml-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Chat;
