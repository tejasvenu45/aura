/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Aura from "./assets/aura.png";

function PublicQNA() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [question, setQuestion] = useState("");
  const [faqData, setFaqData] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/questionPublic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ question }), // Ensure question is an object with a key
      });

      if (!res.ok) {
        console.log("error in fetch!");
        const errorData = await res.json();
        console.error(errorData);
      } else {
        const data = await res.json();
        console.log("Success:", data);
        // Update faqData with the new question
        setFaqData((prevFaqData) => [...prevFaqData, data]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function receiveQuestion() {
      try {
        const req = await fetch("http://localhost:8000/api/getQuestions", {
          method: "GET",
          headers: { "Content-type": "application/json" },
          credentials: "include",
        });

        if (!req.ok) {
          console.error("Failed to fetch questions");
          return;
        }

        const data = await req.json();
        setFaqData(data); // Assuming data is an array
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    receiveQuestion();
  }, []); // Only fetch once when the component mounts

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-wrap">
      <div className="max-w-4xl mx-auto p-6 w-full sm:w-1/2">
        <h1 className="text-4xl font-bold mb-8 text-green-700">
          Public Questions
        </h1>
        {faqData.map((item, index) => (
          <div key={index} className="mb-4">
            <div
              className="cursor-pointer p-4 bg-purple-800 text-white rounded"
              onClick={() => toggleAnswer(index)}
            >
              {item.question}
            </div>
            {activeIndex === index && (
              <div className="mt-2 p-4 bg-orange-400 text-black rounded">
                {item.answer &&
                  item.answer.map((answer, idx) => (
                    <div key={idx} className="mb-2">
                      {answer.answer}
                      {console.log(answer)}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full sm:w-1/2 p-6 flex flex-col items-center">
        <img src={Aura} alt="Aura" className="mb-4 w-12 h-auto" />
        <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
        <p className="text-lg mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          vehicula magna at diam convallis, at bibendum mauris elementum.
          Quisque at tellus sapien. Vivamus volutpat nunc ac odio congue, ac
          tincidunt nulla suscipit. Sed vitae sem lacus. Integer feugiat, urna
          vel tincidunt finibus, magna est tincidunt libero, non vestibulum
          tortor felis vel mi.
        </p>
        <div className="w-full">
          <form method="post" onSubmit={handleSubmit}>
            <textarea
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700"
              rows="4"
              placeholder="Type your question here..."
              name="question"
              id="question"
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            ></textarea>
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PublicQNA;
