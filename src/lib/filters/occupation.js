import { loadTaxonomyData } from '$lib/services/dataLoader.js';
import { extractUnit } from '$lib/utils.js';
import { validateCodes } from '$lib/utils/validation.js';
import { downloadConfigs } from '$lib/config/downloads.js';

export const occupationFilter = {
	async validate(codes) {
		try {
			const taxonomyData = await loadTaxonomyData('occupation');
			const units = extractUnit(taxonomyData);
			const validCodes = units.map(unit => unit.code);
			
			return validateCodes(codes, validCodes, 'occupation');
		} catch (error) {
			return {
				isValid: false,
				errors: [error.message]
			};
		}
	},

	async apply(data, codes) {
		const config = downloadConfigs.occupation;
		return data.filter(row => codes.includes(Number(row[config.filterField])));
	},

	async getNames(codes) {
		try {
			const taxonomyData = await loadTaxonomyData('occupation');
			const units = extractUnit(taxonomyData);
			
			return codes.map(code => {
				const unit = units.find(u => u.code === code);
				return unit ? { code, name: unit.name } : { code, name: `Unknown (${code})` };
			});
		} catch (error) {
			return codes.map(code => ({ code, name: `Error loading name (${code})` }));
		}
	}
};