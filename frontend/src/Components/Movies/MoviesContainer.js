import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this import is here if not already done
import InsertMovie from "./InsertMovie";
import RemoveMovie from "./DeleteMovie";
import { Form } from 'react-bootstrap'; 

import GetMoviesByDate from "./GetMoviesByDate";
import UpdateMovie from "./UpdateMovie";  // Import UpdateMovie

export default function MoviesContainer({ host, port }) {
    const [operation, setOperation] = useState("insert");
    const [movieData, setMovieData] = useState({
        title: '',
        price: '',
        date: '',
        time: '',
        venue: '',
        rating: '',
        id: '', 
    });
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleOperationChange = (e) => {
        setOperation(e.target.value);
        setMovieData({ title: '', price: '', date: '', time: '', venue: '', rating: '', id: '' });
        setResult(null);
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            method: operation,
            ...movieData,
        };

        try {
            const response = await fetch(`http://${host}:${port}/api/movies`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();
            if (response.ok) {
                setResult(result);
                setError(null);
            } else {
                setError(result.error || "An error occurred");
                setResult(null);
            }
        } catch (error) {
            setError("Network error: " + error.message);
            setResult(null);
        }
    };

    return (
        <div className="gradient-background">
            <style>
                {`
                    /* Ombre background with animation */
                    .gradient-background {
                        background: linear-gradient(135deg, #223127, #E2E2E2, #280003, white);
                        background-size: 400% 400%;
                        animation: gradientAnimation 15s ease infinite;
                        min-height: 100vh; /* Ensure full viewport height */
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 2rem;
                    }

                    @keyframes gradientAnimation {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                    .form-container {
                        background: rgba(255, 255, 255, 0.7);
                        backdrop-filter: blur(10px);
                        border-radius: 15px;
                        padding: 2rem;
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                        width: 80%;
                        max-width: 900px;
                    }

                    .form-container h2 {
                        text-align: center;
                        margin-bottom: 1.5rem;
                    }

                    .form-container input, .form-container select {
                        height: 45px;
                        border-radius: 5px;
                        border: 1px solid #ced4da;
                        padding: 0.5rem 1rem;
                        margin-bottom: 1rem;
                        width: 100%;
                    }

                    .form-container input:focus, .form-container select:focus {
                        border-color: #007bff;
                        outline: none;
                        box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
                    }

                    .form-container button {
                        background-color: #007bff;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        height: 45px;
                        transition: background-color 0.3s ease;
                        width: 100%;
                    }

                    .form-container button:hover {
                        background-color: #0056b3;
                    }

                    .alert-container {
                        margin-top: 1rem;
                    }
                `}
            </style>

            {/* Header */}
            <div className="header-bar">
                <h3 style={{ color: "white" }}>Movie Operations</h3>
            </div>

            {/* Action Dropdown */}
            <div className="action-bar">
            <Form.Label htmlFor="formAction" style={{ color: 'white' }}>
        Action:
    </Form.Label>
                <Form.Control
                    as="select"
                    id="formAction"
                    value={operation}
                    onChange={handleOperationChange}
                    style={{ textAlign: "center", textAlignLast: "center", marginBottom: "20px" }}  // Add marginBottom to create space
                >
                    <option value="insert">Insert Movie</option>
                    <option value="get_today">Get Movies by Date and Rating</option>
                    <option value="remove">Remove Movie</option>
                    <option value="update">Update Movie</option> 
                </Form.Control>
            </div>

            {/* Inner Container */}
            <div className="form-container">
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="form-group">
                        <label>Select Operation:</label>
                        <select
                            className="form-control"
                            value={operation}
                            onChange={handleOperationChange}
                            style={{ marginBottom: "20px" }}  // Added marginBottom to create space
                        >
                            <option value="insert">Insert Movie</option>
                            <option value="get_today">Get Movies by Date and Rating</option>
                            <option value="remove">Remove Movie</option>
                            <option value="update">Update Movie</option> 
                        </select>
                    </div>

                    {/* Conditional rendering based on operation */}
                    {operation === "insert" && <InsertMovie movieData={movieData} onInputChange={handleInputChange} onSubmit={handleSubmit} />}
                    {operation === "get_today" && <GetMoviesByDate movieData={movieData} onInputChange={handleInputChange} result={result} />}
                    {operation === "remove" && <RemoveMovie movieData={movieData} onInputChange={handleInputChange} onSubmit={handleSubmit} />}
                    {operation === "update" && <UpdateMovie movieData={movieData} onInputChange={handleInputChange} onSubmit={handleSubmit} />} 
                </form>

                {/* Display the result */}
                {result && (
                    <div className="alert alert-success">
                        <strong>Success!</strong> {JSON.stringify(result)}
                    </div>
                )}

                {/* Display the error */}
                {error && (
                    <div className="alert alert-danger">
                        <strong>Error!</strong> {error}
                    </div>
                )}
            </div>
        </div>
    );
}
