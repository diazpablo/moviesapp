import React from 'react';
import Joi from 'joi-browser';
import Form from "./common/form";

class LoginForm extends Form {

	state = {
		data: {
			username: '',
			password: ''
		},
		errors: {}
	}

	schema = {
		username: Joi.string().trim().required().label('Username'),
		password: Joi.string().trim().required().label('Password')
	}

	doSubmit = () => {
		// Call the server
		console.log('Submitted');
	}

	render() {
		const { handleSubmit } = this;
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={handleSubmit}>
					{this.renderInput('username', 'Username', 'text', true)}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderSubmitButton('Login')}
				</form>
			</div>
		);
	}
};

export default LoginForm;
