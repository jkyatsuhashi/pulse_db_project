import React, { useState } from 'react';

export default function RestaurantsParent({host, port}) {
    const [response, setResponse] = useState(null);

    const postData = async () => {
    const dataToSend = { 
        method: "insert", 
        name: 'Test', 
        type: "test", 
        action: 'Sending data to Flask' 
    };

        try {
            const res = await fetch(`http://${host}:${port}/api/restaurants`, {
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
        <div>
        <button onClick={postData}>Send Data to Flask</button>
        {response && <div>Response: {JSON.stringify(response)}</div>}
        </div>
    );
}
