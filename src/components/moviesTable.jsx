import React from 'react';
import Like from "./common/like";
import PropTypes from 'prop-types';
import Table from "./common/table";

const MoviesTable = props => {
	const { movies, sortColumn, onDelete, onLike, onSort } = props;

	const columns = [
		{ path: 'title', label: 'Title' },
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
		/>
	);
};

MoviesTable.propTypes = {
	movies: PropTypes.array.isRequired,
	onLike: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
}

export default MoviesTable;
