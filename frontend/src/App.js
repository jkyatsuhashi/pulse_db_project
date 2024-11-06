import React, { useState } from 'react';

function App() {
  const host = 'db8.cse.nd.edu'
  const [response, setResponse] = useState(null);

  const postData = async () => {
    const dataToSend = { method: "get" ,name: 'Test', type: "test", action: 'Sending data to Flask' };
    
    try {
      const res = await fetch(`http://${host}:5071/api/restaurants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div className="App">
      <h1>React-Post to Flask</h1>
      <button onClick={postData}>Send Data to Backend</button>
      {response && (
        <div>
          <p>{response.message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
