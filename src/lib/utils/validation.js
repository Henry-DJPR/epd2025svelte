export function validateCodes(codes, validCodes, paramName) {
	const errors = [];
	const invalidCodes = [];
	
	codes.forEach(code => {
		if (!validCodes.includes(code)) {
			invalidCodes.push(code);
		}
	});
	
	if (invalidCodes.length > 0) {
		errors.push(`Invalid ${paramName} codes: ${invalidCodes.join(', ')}`);
	}
	
	return {
		isValid: errors.length === 0,
		errors,
		invalidCodes
	};
}

export function validateDataExists(data, paramName) {
	if (!data || data.length === 0) {
		return {
			isValid: false,
			errors: [`No data found for ${paramName} selection`]
		};
	}
	
	return {
		isValid: true,
		errors: []
	};
}