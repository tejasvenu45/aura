import React, { useState } from 'react';
import Aura from "./assets/aura.png";

const faqData = [
  {
    question: 'What is React?',
    answer: 'React is a JavaScript library for building user interfaces.',
  },
  {
    question: 'What is Tailwind CSS?',
    answer: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.',
  },
  {
    question: 'How do I use Tailwind CSS with React?',
    answer: 'You can use Tailwind CSS with React by installing Tailwind via npm and including it in your project’s CSS file.',
  },
];

function PublicQNA() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-wrap">
      <div className="max-w-4xl mx-auto p-6 w-full sm:w-1/2">
        <h1 className="text-4xl font-bold mb-8 text-green-700">Public Questions</h1>
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
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full sm:w-1/2 p-6 flex flex-col items-center">
        <img src={Aura} alt="Aura" className="mb-4 w-12 h-auto" />
        <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
        <p className="text-lg mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula magna at diam convallis, at bibendum mauris elementum. Quisque at tellus sapien. Vivamus volutpat nunc ac odio congue, ac tincidunt nulla suscipit. Sed vitae sem lacus. Integer feugiat, urna vel tincidunt finibus, magna est tincidunt libero, non vestibulum tortor felis vel mi.
        </p>
        <div className="w-full">
          <textarea
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-700"
            rows="4"
            placeholder="Type your question here..."
          ></textarea>
          <button className="mt-4 px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublicQNA;
