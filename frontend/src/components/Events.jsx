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
        <div>
            <h5>{element.name}</h5>
            <p>{element.description}</p>
            <button onClick={()=>direct(element._id)}>Register Now!</button>
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