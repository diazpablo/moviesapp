import React from 'react';
import Joi from 'joi-browser';
import Form from "./common/form";

class RegisterForm extends Form {

	state = {
		data: {
			username: '',
			name: '',
			password: '',
			password2: ''
		},
		errors: {}
	}

	schema = {
		username: Joi.string().trim().email().required().label('Username'),
		name: Joi.string().trim().required().label('Name'),
		password: Joi.string().trim().min(5).required().label('Password'),
		password2: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: '!!Passwords do not match' } } }).label('Repeat Password')
	}

	doSubmit = () => {
		// Call the server
		console.log('Submitted');
	}

	render() {
		const { handleSubmit } = this;
		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={handleSubmit}>
					{this.renderInput('username', 'Username', 'text', true)}
					{this.renderInput('name', 'Name')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('password2', 'Repeat Password', 'password')}
					{this.renderSubmitButton('Register')}
				</form>
			</div>
		);
	}
};

export default RegisterForm;
