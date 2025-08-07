import { loadTaxonomyData } from '$lib/services/dataLoader.js';
import { validateCodes } from '$lib/utils/validation.js';
import { downloadConfigs } from '$lib/config/downloads.js';

export const regionFilter = {
	async validate(codes) {
		try {
			// Placeholder validation for Victorian regions
			const validCodes = ['metro', 'barwon', 'central_highlands', 'gippsland', 'goldfields', 'hume', 'loddon_mallee', 'wimmera'];
			
			// Allow both string codes and their equivalents
			const normalizedCodes = codes.map(code => String(code).toLowerCase());
			
			const invalidCodes = normalizedCodes.filter(code => !validCodes.includes(code));
			
			return {
				isValid: invalidCodes.length === 0,
				errors: invalidCodes.length > 0 ? [`Invalid region codes: ${invalidCodes.join(', ')}`] : [],
				invalidCodes
			};
		} catch (error) {
			return {
				isValid: false,
				errors: [error.message]
			};
		}
	},

	async apply(data, codes) {
		const config = downloadConfigs.region;
		const normalizedCodes = codes.map(code => String(code).toLowerCase());
		return data.filter(row => {
			const rowRegion = String(row[config.filterField]).toLowerCase();
			return normalizedCodes.includes(rowRegion);
		});
	},

	async getNames(codes) {
		// Placeholder region names
		const regionNames = {
			'metro': 'Melbourne Metro',
			'barwon': 'Barwon',
			'central_highlands': 'Central Highlands',
			'gippsland': 'Gippsland',
			'goldfields': 'Goldfields',
			'hume': 'Hume',
			'loddon_mallee': 'Loddon Mallee',
			'wimmera': 'Wimmera'
		};
		
		return codes.map(code => {
			const normalizedCode = String(code).toLowerCase();
			return {
				code,
				name: regionNames[normalizedCode] || `Unknown Region (${code})`
			};
		});
	}
};