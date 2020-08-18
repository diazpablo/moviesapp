import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ columns, sortColumn, onSort }) => {

	const raiseSort = path => {
		let newSortColumn = { ...sortColumn, path };
		if (sortColumn.path === path) {
			newSortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
		} else {
			newSortColumn.order = 'asc';
		}
		onSort(newSortColumn);
	}

	const renderSortIcon = column => {
		if (column.path !== sortColumn.path) return null;
		if (sortColumn.order === 'asc') return <i className="fa fa-sort-amount-asc" />
		return <i className="fa fa-sort-amount-desc" />
	}

	return (
		<thead className="thead-dark">
		<tr>
			{columns.map(column => (
				<th key={column.path || column.key} role="button" onClick={() => raiseSort(column.path)}>
					{column.label} {renderSortIcon(column)}
				</th>
			))}
		</tr>
		</thead>
	);
};

TableHeader.propTypes = {
	columns: PropTypes.array.isRequired,
	sortColumn: PropTypes.object.isRequired,
	onSort: PropTypes.func.isRequired
}

export default TableHeader;
