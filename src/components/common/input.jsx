import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, label, error, ...rest }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				{...rest}
				className="form-control"
				name={name}
				id={name}
			/>
			{error && <div className="alert alert-danger mt-1">{error}</div>}
		</div>
	);
};

Input.defaultProps = {
	type: 'text'
}

Input.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string,
	autoFocus: PropTypes.bool,
	type: PropTypes.string
}

export default Input;
