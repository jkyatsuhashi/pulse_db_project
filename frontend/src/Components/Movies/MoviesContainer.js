import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this import is here if not already done
import InsertMovie from "./InsertMovie";
import RemoveMovie from "./DeleteMovie";
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
    <div className="container mt-4">
    <h1>Movie Operations</h1>
    <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
        <label>Select Operation:</label>
        <select className="form-control" value={operation} onChange={handleOperationChange}>
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
);
}
