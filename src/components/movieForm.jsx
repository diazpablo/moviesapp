import React from 'react';
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
	state = {
		data: {
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
		title: Joi.string().trim().min(5).required().label('Title'),
		genreId: Joi.string().required().label('Genre'),
		numberInStock: Joi.number().integer().min(0).max(100).required().label('Number in Stock'),
		dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate')
	}

	async populateGenres() {
		const { data: genres } = await getGenres();
		this.setState({ genres })
	}

	async populateMovie() {
		try {
			const movieId = this.props.match.params.id;
			if (movieId === 'new') return;

			const { data: movie } = await getMovie(movieId);
			this.setState({ data: this.mapToViewModel(movie) });
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				return this.props.history.replace('/not-found');
		}
	}

	async componentDidMount() {
		await this.populateGenres();
		await this.populateMovie();
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

	doSubmit = async () => {
		await saveMovie(this.state.data);

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
