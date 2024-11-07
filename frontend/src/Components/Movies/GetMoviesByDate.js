import React from 'react';

export default function GetMoviesByDate({ movieData, onInputChange, onSubmit }) {
    return (
        <div>
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

            <div className="form-group">
                <label>Date:</label>
                <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={movieData.date}
                    onChange={onInputChange}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </div>
    );
}
