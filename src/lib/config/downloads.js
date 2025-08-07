export const downloadConfigs = {
	occupation: {
		paramKey: 'occupation',
		taxonomyFile: 'anzsco2021_nested.json',
		workbookFile: 'occupation_2027.json',
		filterField: 'Occupation ANZSCO4 Code',
		filename: 'occupation_data.xlsx',
		sheetName: 'Occupation Data',
		displayName: 'Occupation',
		codeField: 'code'
	},
	industry: {
		paramKey: 'industry',
		taxonomyFile: 'anzsic.json',
		workbookFile: 'industry_2027.json',
		filterField: 'Industry ANZSIC Code',
		filename: 'industry_data.xlsx',
		sheetName: 'Industry Data',
		displayName: 'Industry',
		codeField: 'code'
	},
	region: {
		paramKey: 'region',
		taxonomyFile: 'regions.json',
		workbookFile: 'region_2027.json',
		filterField: 'Region Code',
		filename: 'region_data.xlsx',
		sheetName: 'Region Data',
		displayName: 'Region',
		codeField: 'code'
	}
};

export const getConfigByParam = (paramKey) => {
	return Object.values(downloadConfigs).find(config => config.paramKey === paramKey);
};

export const getAllParamKeys = () => {
	return Object.values(downloadConfigs).map(config => config.paramKey);
};