import http from './httpService';

const apiEndpoint = '/movies';

function movieUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export function getMovies() {
	return http.get(apiEndpoint);
}

export function getMovie(id) {
	return http.get(movieUrl(id));
}

export async function saveMovie(movie) {
	const { _id: id } = movie;
	if (id) {
		const body = { ...movie }
		delete body._id;
		return http.put(movieUrl(id), body);
	}
	return http.post(apiEndpoint, movie);
}

export function deleteMovie(id) {
	return http.delete(movieUrl(id));
}
