import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
	const startIndex = (pageNumber - 1) * pageSize;

	return _(items)
		.slice(startIndex)
		.take(pageSize)
		.value();
}

export function filter(items, filterProperty, filterValue) {
	return !!filterValue && !!filterProperty ? items.filter(item => {
		return _.get(item, filterProperty) === filterValue
	}) : items;
}

export function order(items, sortValue, sortOrder) {
	return _.orderBy(items, [ sortValue ], [ sortOrder ]);
}

export function search(items, searchedValue) {
	return _.filter(items, item =>
		item.title.toLowerCase().includes(searchedValue.toLowerCase())
	);
}