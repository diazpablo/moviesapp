import React from 'react';
import styled from '@emotion/styled'
import PropTypes from 'prop-types';
import _ from 'lodash';

const basePag = ({ itemsCount, pageSize, currentPage, onPageChange, className }) => {

		const pagesCount = Math.ceil(itemsCount / pageSize);
		if (pagesCount === 1) return null;

		const pages = _.range(1, pagesCount + 1);

		return (
			<nav aria-label={"Page navigation example"} className={className}>
				<ul className="pagination">
					<li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
						<span
							role="button"
							className="page-link" aria-label="Previous"
							aria-disabled={currentPage === 1}
							onClick={() => {
								if (currentPage > 1)
									onPageChange(currentPage - 1)
							}}
						>
							<span aria-hidden="true">&laquo;</span>
						</span>
					</li>
					{pages.map(page => (
						<li key={page} className={`page-item${page === currentPage ? ' active' : ''}`}>
							<span
								role="button"
								className="page-link"
								onClick={() => {
									onPageChange(page)
								}}
							>{page}</span>
						</li>
					))}
					<li className={`page-item${currentPage === pagesCount ? ' disabled' : ''}`}>
						<span
							role="button"
							className="page-link" aria-label="Next"
							aria-disabled={currentPage === pagesCount}
							onClick={() => {
								if (currentPage < pagesCount)
									onPageChange(currentPage + 1)
							}}
						>
							<span aria-hidden="true">&raquo;</span>
						</span>
					</li>
				</ul>
			</nav>
		);
	}
;

//language=CSS
const Pagination = styled(basePag)`
	.pagination > li > span {
		background-color: #343a40;
		color: white;
	}

	.pagination > li > span:focus,
	.pagination > li > span:hover {
		color: #343a40;
		background-color: #eee;
		border-color: #ddd;
	}

	.pagination > .active > span, .pagination > .active > span:hover {
		color: #343a40;
		font-weight: bold;
	  background-color: white;
		border: solid 1px #343a40 !important;
	}
  .page-item.disabled .page-link {
		  color: #dee2e6;
  }
`

Pagination.propTypes = {
	itemsCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired
};

export default Pagination;
