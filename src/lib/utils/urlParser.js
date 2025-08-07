import { getAllParamKeys } from '$lib/config/downloads.js';

export function parseUrlParams(paramString) {
	if (!paramString) return {};
	
	const params = {};
	const validParamKeys = getAllParamKeys();
	
	// Split by forward slash to get individual param=value pairs
	const segments = paramString.split('/').filter(segment => segment.length > 0);
	
	segments.forEach(segment => {
		// Check if segment contains = sign
		if (segment.includes('=')) {
			const [key, value] = segment.split('=', 2);
			
			// Only process if it's a valid parameter key
			if (validParamKeys.includes(key) && value) {
				// Split multiple values by + sign and convert to numbers
				params[key] = value.split('+').map(val => {
					const num = Number(val);
					return isNaN(num) ? val : num;
				});
			}
		}
	});
	
	return params;
}

export function validateParams(params) {
	const errors = [];
	const validParamKeys = getAllParamKeys();
	
	// Check if we have at least one valid parameter
	const hasValidParams = Object.keys(params).some(key => validParamKeys.includes(key));
	
	if (!hasValidParams) {
		errors.push('No valid filter parameters provided');
	}
	
	// Validate each parameter
	Object.entries(params).forEach(([key, values]) => {
		if (!validParamKeys.includes(key)) {
			errors.push(`Invalid parameter: ${key}`);
		}
		
		if (!Array.isArray(values) || values.length === 0) {
			errors.push(`Invalid values for parameter: ${key}`);
		}
	});
	
	return {
		isValid: errors.length === 0,
		errors
	};
}

export function buildParamString(params) {
	const segments = [];
	
	Object.entries(params).forEach(([key, values]) => {
		if (Array.isArray(values) && values.length > 0) {
			const valueString = values.join('+');
			segments.push(`${key}=${valueString}`);
		}
	});
	
	return segments.join('/');
}