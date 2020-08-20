import React from 'react';
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
	state = {
		data: {
			id: '',
			title: '',
			genreId: '',
			numberInStock: '',
			dailyRentalRate: ''
		},
		genres: [],
		errors: {}
	}

	schema = {
		_id: Joi.string(),
		title: Joi.string().trim().required().label('Title'),
		genreId: Joi.string().required().label('Genre'),
		numberInStock: Joi.number().integer().min(0).max(100).required().label('Number in Stock'),
		dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate')
	}

	componentDidMount() {
		const genres = getGenres();
		this.setState({ genres })

		const { match, history } = this.props;
		const movieId = match.params.id;
		if (movieId === 'new') return;

		const movie = getMovie(movieId);
		if (!movie) return history.replace('/not-found');
		this.setState({ data: this.mapToViewModel(movie) });
	}

	mapToViewModel(movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate
		}
	}

	doSubmit = () => {
		saveMovie(this.state.data);

		this.props.history.push('/movies');
	}

	render() {
		const { handleSubmit } = this;
		return (
			<div>
				<h1>MovieForm</h1>
				<form onSubmit={handleSubmit}>
					{this.renderInput('title', 'Title', 'text', true)}
					{this.renderSelect('genreId', 'Genre', this.state.genres)}
					{this.renderInput('numberInStock', 'Number in Stock', 'number')}
					{this.renderInput('dailyRentalRate', 'Rate', 'number')}
					{this.renderSubmitButton('Save')}
				</form>
			</div>
		);
	}
}
;

export default MovieForm;
