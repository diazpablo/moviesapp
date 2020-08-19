import React from 'react';
import Like from "./common/like";
import PropTypes from 'prop-types';
import Table from "./common/table";
import { Link } from "react-router-dom";

const MoviesTable = props => {
	const { movies, sortColumn, rows, onDelete, onLike, onSort } = props;

	const columns = [
		{ path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'numberInStock', label: 'Stock' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{ key: 'like', content: (movie) => <Like liked={movie.liked} onClick={() => onLike(movie)} /> },
		{
			key: 'delete', content: ({ _id }) => <button
				onClick={() => onDelete(_id)}
				className="btn btn-danger btn-sm"
			>
				Delete
			</button>
		},
	];

	return (
		<Table
			data={movies}
			columns={columns}
			sortColumn={sortColumn}
			onSort={onSort}
			rowCount={rows}
		/>
	);
};

MoviesTable.propTypes = {
	movies: PropTypes.array.isRequired,
	rows: PropTypes.number.isRequired,
	onLike: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
}

export default MoviesTable;
