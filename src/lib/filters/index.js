import { occupationFilter } from './occupation.js';
import { industryFilter } from './industry.js';
import { regionFilter } from './region.js';

const filterRegistry = {
	occupation: occupationFilter,
	industry: industryFilter,
	region: regionFilter
};

export function getFilter(filterType) {
	return filterRegistry[filterType];
}

export function getAllFilterTypes() {
	return Object.keys(filterRegistry);
}

export async function applyFilters(params, workbookData) {
	let filteredData = [...workbookData];
	
	// Apply each filter sequentially
	for (const [paramKey, values] of Object.entries(params)) {
		const filter = getFilter(paramKey);
		if (filter) {
			filteredData = await filter.apply(filteredData, values);
		}
	}
	
	return filteredData;
}

export async function validateAllFilters(params) {
	const validationResults = {};
	
	for (const [paramKey, values] of Object.entries(params)) {
		const filter = getFilter(paramKey);
		if (filter) {
			validationResults[paramKey] = await filter.validate(values);
		}
	}
	
	return validationResults;
}