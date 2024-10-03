import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Aura from "./assets/aura.png";
import like from "./assets/like.png"

function PublicQNA() {
  const api = import.meta.env.VITE_BASE_URL;

  const [activeIndex, setActiveIndex] = useState(null);
  const [question, setQuestion] = useState("");
  const [faqData, setFaqData] = useState([]);
  const [answer, setAnswer] = useState("") 

  const user = useSelector(state => state.auth.user)

  const navigate = useNavigate()

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const res = await fetch(`${api}/api/questionPublic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        console.log("error in fetch!");
        const errorData = await res.json();
        console.error(errorData);
      } else {
        const data = await res.json();
        console.log("Success:", data);
        setFaqData((prevFaqData) => [...prevFaqData, data]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmitLike(evt, id) {
    evt.preventDefault();

    try {
      const res = await fetch(`${api}/api/like/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        console.log("error in sending likes!");
        const errorData = await res.json();
        console.error(errorData);
      } else {
        const data = await res.json();
        console.log("Success:", data);
        setFaqData((prevFaqData) =>
          prevFaqData.map((item) => (item._id === data._id ? data : item))
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function receiveQuestion() {
      try {
        const req = await fetch(`${api}/api/getQuestions`, {
          method: "GET",
          // headers: { "Content-type": "application/json" },
          credentials: "include",
        });

        if (!req.ok) {
          console.error("Failed to fetch questions");
          return;
        }

        const data = await req.json();
        setFaqData(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    receiveQuestion();
  }, []);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleAnswer = async (evt, id) => {
    evt.preventDefault();

    try {
      const res = await fetch(`${api}/api/answer/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ answer })
      });

      if (!res.ok) {
        console.log("error in sending answer!");
        const errorData = await res.json();
        console.error(errorData);
      } else {
        const data = await res.json();
        console.log("Success:", data);
        navigate('/PublicQNA')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-wrap bg-black text-white">
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
              <h1 className="font-black text-3xl ">
              {item.question}
              </h1>
              <br/>
              <button onClick={(evt) => handleSubmitLike(evt, item._id)} className="flex">
                <img src={like} alt="" className="h-8 w-auto" />
                <h1 className="text-black ml-4 text-2xl font-bold ">
                {item.likes}

                </h1>
              </button>
              {user.isAdmin ? (
                <>
                <label
                  htmlFor="answer"
                  className="block text-white text-center text-2xl"
                >
                  Provide Answer Here
                </label>
                <input
                    type="text"
                    name="answer"
                    className="w-full p-3 text-black border border-gray-300 rounded"
                    onChange={(evt) => setAnswer(evt.target.value)}
                />
                <button onClick={(evt)=>handleAnswer(evt, item._id)} className="bg-orange-700 p-4 font-extrabold text-white py-2 rounded-md hover:bg-orange outline-none focus:bg-orange">
                  Answer
                </button>
                </>
              ):(<></>)}
            </div>
            {activeIndex === index && (
              <div className="mt-2  text-3xl p-4 bg-orange-400 text-black font-bold rounded">
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
