import React from 'react';
import Joi from 'joi-browser';
import Form from "./common/form";
import userService from "../services/userService";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

class RegisterForm extends Form {

	state = {
		data: {
			username: '',
			name: '',
			password: '',
			repeat_password: ''
		},
		errors: {}
	}

	schema = {
		username: Joi.string().trim().email().required().label('Username'),
		name: Joi.string().trim().required().label('Name'),
		password: Joi.string().trim().min(5).required().label('Password'),
		repeat_password: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: '!!Passwords do not match' } } }).label('Repeat Password')
	}

	doSubmit = async () => {
		try {
			const { headers } = await userService.register(this.state.data);
			auth.loginWithJwt(headers['x-auth-token'])
			window.location = '/';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;
				this.setState({ errors });
			}
		}
	}

	render() {
		if (auth.getCurrentUser()) return <Redirect to="/" />;
		const { handleSubmit } = this;
		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={handleSubmit}>
					{this.renderInput('username', 'Username', 'text', true)}
					{this.renderInput('name', 'Name')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('repeat_password', 'Repeat Password', 'password')}
					{this.renderSubmitButton('Register')}
				</form>
			</div>
		);
	}
};

export default RegisterForm;
