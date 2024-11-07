import React from 'react';

export default function UpdateMovie({ movieData, onInputChange, onSubmit }) {
    return (
        <div>
        <div className="form-group">
            <label>Movie ID:</label>
            <input
            type="text"
            name="id"
            className="form-control"
            value={movieData.id}
            onChange={onInputChange}
            required
            />
        </div>
        <div className="form-group">
            <label>Title:</label>
            <input
            type="text"
            name="title"
            className="form-control"
            value={movieData.title}
            onChange={onInputChange}
            
            />
        </div>
        <div className="form-group">
            <label>Price:</label>
            <input
            type="text"
            name="price"
            className="form-control"
            value={movieData.price}
            onChange={onInputChange}
            
            />
        </div>
        <div className="form-group">
            <label>Date:</label>
            <input
            type="date"
            name="date"
            className="form-control"
            value={movieData.date}
            onChange={onInputChange}
            />
        </div>
        <div className="form-group">
            <label>Time:</label>
            <input
            type="time"
            name="time"
            className="form-control"
            value={movieData.time}
            onChange={onInputChange}
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
            />
        </div>
        <div className="form-group">
            <label>Rating:</label>
            <input
            type="number"
            name="rating"
            className="form-control"
            value={movieData.rating}
            onChange={onInputChange}
            />
        </div>

        <button type="submit" className="btn btn-primary">
            Update Movie
        </button>
        </div>
    );
}
