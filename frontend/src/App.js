import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    fetch(`${API_BASE_URL}/api/test`)
      .then(response => response.text())
      .then(data => {
        setMessage(data);
      })
      .catch(error => {
        console.error('Error fetching the message:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>React with Spring Boot Backend</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
