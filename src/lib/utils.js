export function extractOccupations(data) {
	const occupations = [];

	data.forEach((major) => {
		major.submajors.forEach((submajor) => {
			submajor.minors.forEach((minor) => {
				minor.units.forEach((unit) => {
					unit.occupations.forEach((occupation) => {
						occupations.push(occupation);
					});
				});
			});
		});
	});

	return occupations;
}

export function extractSubmajor(data) {
	const submajors = [];

	data.forEach((major) => {
		major.submajors.forEach((submajor) => {
			submajors.push(submajor);
		});
	});

	return submajors;
}

export function extractUnit(data) {
	const units = [];
	data.forEach((major) => {
		major.submajors.forEach((submajor) => {
			submajor.minors.forEach((minor) => {
				minor.units.forEach((unit) => {
					units.push(unit);
				});
			});
		});
	});
	return units;
}
