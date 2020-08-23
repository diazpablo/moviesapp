import React, { Component } from 'react';
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "./common/paginations";
import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate, filter, order, search } from "../utils/helpers";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		selectedGenre: null,
		pageSize: 4,
		currentPage: 1,
		sortColumn: { path: 'title', order: 'asc' },
		searchQuery: ''
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData = async () => {
		const { data: genres } = await getGenres();
		const { data: movies } = await getMovies();
		this.setState({ genres, movies })
	};

	handleDelete = async id => {
		const originalMovies = this.state.movies;
		const movies = this.state.movies.filter(m => m._id !== id);
		this.setState({ movies })

		try {
			await deleteMovie(id);
		} catch (ex) {
			if (ex.response && ex.response.status < 500 && ex.response.status >= 400) {
				const { status } = ex.response;
				switch (status) {
					case 404:
						toast.error('This movie has already been deleted');
						break;
					case 403:
						toast.error('Your account is not cannot do this action');
						break;
					default:
						toast.error('There\'s been an error please come back later');
				}
				this.setState({ movies: originalMovies });
			}
		}
	}

	handleLike = id => {
		const movies = [ ...this.state.movies ];
		const index = movies.indexOf(id);
		movies[index].liked = !this.state.movies[index].liked;
		this.setState({ movies });
	}


	handlePageChange = currentPage => {
		this.setState({ currentPage });
	}

	handleGenreSelect = genre => {
		this.setState({
			currentPage: 1,
			searchQuery: '',
			selectedGenre: genre
		})
	}

	handleSort = sortColumn => {
		this.setState({ sortColumn })
	}

	handleSearch = query => {
		this.setState({
			searchQuery: query,
			currentPage: 1
		})
	}

	render() {
		const { user } = this.props;
		const {
			movies, genres,
			selectedGenre, sortColumn, currentPage,
			pageSize, searchQuery
		} = this.state;
		const filtered = filter(movies, 'genre._id', !!selectedGenre && selectedGenre._id);
		const searched = search(filtered, searchQuery);
		const sorted = order(searched, sortColumn.path, sortColumn.order);
		const paginatedMovies = paginate(sorted, currentPage, pageSize);

		const { length: count } = searched;

		return (
			<div className="row">
				<div className="col-3">

					<ListGroup
						items={genres}
						selectedItem={selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>

				</div>
				<div className="col">
					{user && (
						<Link
							to="/movies/new" className="btn btn-dark mb-3">Add Movie
						</Link>
					)}
					<p>Showing {count} movies in database:</p>
					<SearchBox value={searchQuery} onChange={this.handleSearch} />
					<MoviesTable
						movies={paginatedMovies}
						sortColumn={sortColumn}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
						rows={pageSize}
					/>

					<Pagination
						itemsCount={filtered.length}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>

				</div>
			</div>
		);
	}
}

export default Movies;