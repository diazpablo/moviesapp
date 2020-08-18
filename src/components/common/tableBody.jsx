import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const TableBody = ({ data, columns }) => {

	const renderCell = (item, column) => {
		if (column.content) return column.content(item);
		return _.get(item, column.path)
	}

	const createKey = (item, column) => item._id + (column.path || column.key);

	return (
		<tbody>
		{
			data.map(item => {
				return (
					<tr key={item._id}>
						{columns.map(column => (
							<td key={createKey(item, column)}>{renderCell(item, column)}</td>
						))}
					</tr>
				)
			})
		}
		</tbody>
	);
};

TableBody.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired
}

export default TableBody;
