import React, { useState } from "react";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [messageId, setmessageId] = useState(0);
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.trim() !== "") {
      setMessages([...messages, input]);
       setInput("");
    }
    setmessageId((prev)=>{prev++;})
    console.log(messages, messageId, input)
        try {
          const res = await fetch("http://localhost:8000/api/questionPublic", {
            method: "POST",
            credentials: 'include',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({question: input}),
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
          <div
            className="bg-gray-800 p-4 rounded-lg shadow-lg"
            style={{ height: "80%", overflowY: "scroll", width: "90%" }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className="my-2 px-4 py-2 rounded-lg bg-green-700 text-white"
              >
                {message}
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
