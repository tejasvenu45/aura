import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function Events() {
  const [data, setData] = useState([]);

  useEffect(function() {
    fetch('http://localhost:8000/api/getEvents', {
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  
  const navigate = useNavigate();

  function direct(ID) {
    navigate(`/DynamicForm/${ID}`);
  }

  const cards = data.map(function(element) {
    return (
      <div className='flex flex-col items-center justify-center w-full'>
      <div
        className="mb-4 cursor-pointer text-center p-4 bg-purple-800 w-96 text-white rounded"
        onClick={() => toggleAnswer(index)}
      >
        <h1 className='font-black text-4xl'>
        {element.name}
        </h1>
        <br/>
        <button onClick={()=>direct(element._id)} className="bg-orange-700 p-4 font-extrabold text-white py-2 rounded-md hover:bg-orange outline-none focus:bg-orange">
          Register Now!
        </button>
      </div>
      </div>
    )
  });

    return (
      <>
        <div className='bg-black min-h-screen'>
          {cards}
        </div>
      </>
  );
  
}

export default Events;