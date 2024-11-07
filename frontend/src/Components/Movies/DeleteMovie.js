import React from "react";
// Remove Movie Component
export default function RemoveMovie({ movieData, onInputChange, onSubmit }) {
    return (
    <>
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
            required
        />
        </div>
        <button type="submit" className="btn btn-danger" onClick={onSubmit}>
        Remove Movie
        </button>
    </>
    );
}