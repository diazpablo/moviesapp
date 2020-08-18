import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = props => {
	const { items, textProperty, valueProperty, selectedItem, onItemSelect } = props;
	return (
		<ul className="list-group">
			{items.map(item => (
				<li
					role="button"
					onClick={() => onItemSelect(item)}
					key={item[textProperty]}
					className={`list-group-item${item === selectedItem ? ' active' : ''}`}
				>
					{item[valueProperty]}
				</li>
			))}
		</ul>
	);
};

ListGroup.defaultProps = {
	textProperty: '_id',
	valueProperty: 'name'
}

ListGroup.propTypes = {
	items: PropTypes.array.isRequired,
	textProperty: PropTypes.string,
	valueProperty: PropTypes.string,
	onItemSelect: PropTypes.func
}

export default ListGroup;
