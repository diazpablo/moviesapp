import React from 'react';

const MovieForm = ({ match, history }) => {
	return (
		<div>
			<h1>MovieForm</h1>
			<p>ID: {match.params.id}</p>
			<button className="btn btn-primary" onClick={() => history.push('/movies')}>Save</button>
		</div>
	);
};

export default MovieForm;
