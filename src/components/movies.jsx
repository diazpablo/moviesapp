import React, { useState, useEffect } from 'react';
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "./common/paginations";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate, filter, order } from "../utils/helpers";
import { Link } from "react-router-dom";

const Movies = () => {
	const [ movies, setMovies ] = useState([]);
	const [ genres, setGenres ] = useState([]);
	const [ selectedGenre, setSelectedGenre ] = useState(null);
	const [ pageSize ] = useState(4);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ sortColumn, setSortColumn ] = useState({ path: 'title', order: 'asc' });

	useEffect(() => {
		setMovies(getMovies());
		const allGenres = [ { _id: '', name: 'All Genres' }, ...getGenres() ]
		setGenres(allGenres);
	}, []);

	const handleDelete = id => {
		setMovies(movies.filter(m => m._id !== id));
	}

	const handleLike = id => {
		const newMovies = [ ...movies ];
		const index = movies.indexOf(id);
		newMovies[index].liked = !movies[index].liked;
		setMovies(newMovies);
	}


	const handlePageChange = page => {
		setCurrentPage(page);
	}

	const handleGenreSelect = genre => {
		setCurrentPage(1);
		setSelectedGenre(genre);
	}

	const handleSort = newSortColumn => {
		setSortColumn(newSortColumn);
	}

	const filtered = filter(movies, 'genre._id', !!selectedGenre && selectedGenre._id);
	const sorted = order(filtered, sortColumn.path, sortColumn.order);
	const showMovies = paginate(sorted, currentPage, pageSize);

	const { length: count } = filtered;
	if (count === 0) return <p>There are no movies in the database.</p>;

	return (
		<div className="row">
			<div className="col-3">

				<ListGroup
					items={genres}
					selectedItem={selectedGenre}
					onItemSelect={handleGenreSelect}
				/>

			</div>
			<div className="col">
				<Link to="/movies/new" className="btn btn-dark mb-3">Add Movie</Link>
				<p>Showing {count} movies in database:</p>

				<MoviesTable
					movies={showMovies}
					sortColumn={sortColumn}
					onLike={handleLike}
					onDelete={handleDelete}
					onSort={handleSort}
					rows={pageSize}
				/>

				<Pagination
					itemsCount={filtered.length}
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>

			</div>
		</div>
	);
}

export default Movies;