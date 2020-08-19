import React from 'react';
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const TableBase = ({ data, columns, sortColumn, onSort, className }) => {
	const classes = `table table-hover ${className}`;
	return (
		<table className={classes}>
			<TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
			<TableBody data={data} columns={columns} rowHeight={'50px'} />
		</table>
	);
};

const Table = styled(TableBase)`
	min-height: calc(50px + 56px* ${({ rowCount }) => rowCount});
`

Table.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	sortColumn: PropTypes.object.isRequired,
	onSort: PropTypes.func.isRequired,
	rowCount: PropTypes.number.isRequired
}


export default Table;
