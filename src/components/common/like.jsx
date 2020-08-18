import React from 'react';
import PropTypes from 'prop-types';

const Like = ({ liked = false, onClick }) => {
	let classes = "fa fa-heart";
	if (!liked) classes += "-o";

	return (
		<i
			onClick={onClick}
			className={classes}
			role="button"
			aria-hidden="true" />
	);
};

Like.propTypes = {
	liked: PropTypes.bool,
	onClick: PropTypes.func
}

export default Like;
