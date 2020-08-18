import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
	const startIndex = (pageNumber - 1) * pageSize;

	return _(items)
		.slice(startIndex)
		.take(pageSize)
		.value();
}

export function filter(items, filterProperty, filterValue) {
	return !!filterValue && !!filterValue[filterProperty] ? items.filter(item => item.genre._id === filterValue[filterProperty]) : items;
}

export function order(items, sortValue, sortOrder) {
	return _.orderBy(items, [sortValue], [ sortOrder]);
}