import React, { Component } from 'react';
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {

	state = {
		data: {},
		errors: {}
	}

	validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);
		if (!error) return null;
		const errors = error.details.reduce((errors, { path, message }) =>
			({ ...errors, [path[0]]: message }), {})
		return errors;
	}

	validateProperty = ({ name, value }) => {
		let propertyObj = { [name]: value };
		let propertySchema = { [name]: this.schema[name] };
		if (name.includes('repeat_')) {
			const orgName = name.replace('repeat_', '');
			propertyObj[orgName] = this.state.data[orgName];
			propertySchema[orgName] = this.schema[orgName];
		}
		const { error } = Joi.validate(propertyObj, propertySchema);
		return error ? error.details[0].message : null;
	}

	handleSubmit = e => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	}

	handleInputChange = ({ target: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		let data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data, errors });
	}

	renderSubmitButton(label) {
		return <button
			disabled={this.validate()}
			className="btn btn-primary"
		>
			{label}
		</button>
	}

	renderInput = (name, label, type, autoFocus) => {
		const { data, errors } = this.state;
		return (
			<Input
				label={label} name={name}
				value={data[name]}
				onChange={this.handleInputChange}
				error={errors[name]}
				type={type}
				autoFocus={autoFocus}
			/>
		)
	}

	renderSelect = (name, label, options) => {
		const { data, errors } = this.state;
		return (
			<Select
				label={label} name={name}
				value={data[name]}
				options={options}
				onChange={this.handleInputChange}
				error={errors[name]}
			/>
		)
	}
};

export default Form;
