import React, { useState, useEffect } from 'react';
import { getMovies } from "../services/fakeMovieService";

const Movies = () => {
	const [ movies, setMovies ] = useState([]);

	useEffect(() => {
		setMovies(getMovies());
	}, []);

	const { length: count } = movies;
	if (count === 0) return <p>There are no movies in the database.</p>;

	return (
		<div className="row">
			<div className="col">
				<p>Showing {count} movies in database:</p>

			</div>
		</div>
	);
}

export default Movies;