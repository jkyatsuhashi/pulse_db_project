import React from "react";

export default function InsertMovie({ movieData, onInputChange, onSubmit }) {
    return (
    <>
        <div className="form-group">
        <label>Title:</label>
        <input
            type="text"
            name="title"
            className="form-control"
            value={movieData.title}
            onChange={onInputChange}
            required
        />
        </div>
        <div className="form-group">
        <label>Price:</label>
        <input
            type="number"
            name="price"
            className="form-control"
            value={movieData.price}
            onChange={onInputChange}
            required
        />
        </div>
        <div className="form-group">
        <label>Date (YYYY-MM-DD):</label>
        <input
            type="date"
            name="date"
            className="form-control"
            value={movieData.date}
            onChange={onInputChange}
            required
        />
        </div>
        <div className="form-group">
        <label>Time (HH:MM):</label>
        <input
            type="time"
            name="time"
            className="form-control"
            value={movieData.time}
            onChange={onInputChange}
            required
        />
        </div>
        <div className="form-group">
        <label>Venue:</label>
        <input
            type="text"
            name="venue"
            className="form-control"
            value={movieData.venue}
            onChange={onInputChange}
            required
        />
        </div>
        <div className="form-group">
        <label>Rating:</label>
        <input
            type="text"
            name="rating"
            className="form-control"
            value={movieData.rating}
            onChange={onInputChange}
            required
        />
        </div>
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
        Submit
        </button>
    </>
    );
}