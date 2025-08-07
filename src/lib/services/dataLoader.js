import { downloadConfigs } from '$lib/config/downloads.js';

// Cache for loaded data to avoid re-importing
const dataCache = new Map();

export async function loadTaxonomyData(configKey) {
	const cacheKey = `taxonomy_${configKey}`;
	
	if (dataCache.has(cacheKey)) {
		return dataCache.get(cacheKey);
	}
	
	const config = downloadConfigs[configKey];
	if (!config) {
		throw new Error(`Unknown config key: ${configKey}`);
	}
	
	try {
		const module = await import(`$lib/taxonomies/${config.taxonomyFile}`);
		const data = module.default;
		dataCache.set(cacheKey, data);
		return data;
	} catch (error) {
		throw new Error(`Failed to load taxonomy data for ${configKey}: ${error.message}`);
	}
}

export async function loadWorkbookData(configKey) {
	const cacheKey = `workbook_${configKey}`;
	
	if (dataCache.has(cacheKey)) {
		return dataCache.get(cacheKey);
	}
	
	const config = downloadConfigs[configKey];
	if (!config) {
		throw new Error(`Unknown config key: ${configKey}`);
	}
	
	try {
		const module = await import(`$lib/workbooks/${config.workbookFile}`);
		const data = module.default;
		dataCache.set(cacheKey, data);
		return data;
	} catch (error) {
		throw new Error(`Failed to load workbook data for ${configKey}: ${error.message}`);
	}
}

export function clearCache() {
	dataCache.clear();
}