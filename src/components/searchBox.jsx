import React from 'react';
import Input from "./common/input";

const SearchBox = ({ onChange, ...rest }) => {
	return (
		<Input
			{...rest}
			onChange={e => onChange(e.target.value)}
			name='search' placeholder='Search...'
		/>
	);
};

export default SearchBox;
