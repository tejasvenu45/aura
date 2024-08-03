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

  function direct(postID) {
    navigate(`/DynamicForm/${postID}`);
  }

  const cards = data.map(function(element) {
    return (
      <div
        className="mb-4 cursor-pointer p-4 bg-purple-800 text-white rounded"
        onClick={() => toggleAnswer(index)}
      >
        {element.name}
        <br/>
        <button onClick={()=>direct(element._id)} className="bg-orange font-extrabold text-white py-2 rounded-md hover:bg-orange outline-none focus:bg-orange">
          Register Now!
        </button>
      </div>
    )
  });

    return (
      <>
        <div>
          {cards}
        </div>
      </>
  );
}

export default Events;