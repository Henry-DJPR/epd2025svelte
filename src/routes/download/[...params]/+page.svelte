<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { error } from '@sveltejs/kit';
	import { parseUrlParams, validateParams } from '$lib/utils/urlParser.js';
	import { applyFilters, validateAllFilters, getFilter } from '$lib/filters/index.js';
	import { loadWorkbookData } from '$lib/services/dataLoader.js';
	import { ExcelGenerator } from '$lib/services/excelGenerator.js';
	import { downloadConfigs, getConfigByParam } from '$lib/config/downloads.js';
	import DownloadStatus from '$lib/components/DownloadStatus.svelte';
	import FilterSummary from '$lib/components/FilterSummary.svelte';

	// Parse URL parameters
	const paramString = page.params.params || '';
	const urlParams = parseUrlParams(paramString);
	
	// Validate URL parameters
	const paramValidation = validateParams(urlParams);
	if (!paramValidation.isValid) {
		error(400, `Invalid parameters: ${paramValidation.errors.join(', ')}`);
	}

	// State variables
	let downloadStatus = 'preparing';
	let downloadError = null;
	let filterSummary = {};
	let filteredDataCount = 0;

	// Download logic
	async function performDownload() {
		try {
			downloadStatus = 'validating';
			
			// Validate all filters
			const validationResults = await validateAllFilters(urlParams);
			
			// Check for validation errors
			const hasErrors = Object.values(validationResults).some(result => !result.isValid);
			if (hasErrors) {
				const allErrors = Object.values(validationResults)
					.filter(result => !result.isValid)
					.flatMap(result => result.errors);
				throw new Error(allErrors.join(', '));
			}

			downloadStatus = 'loading_data';

			// Determine which dataset to use (for now, default to occupation)
			const primaryParamKey = Object.keys(urlParams)[0];
			const config = getConfigByParam(primaryParamKey) || downloadConfigs.occupation;
			
			// Load workbook data
			const workbookData = await loadWorkbookData('occupation'); // For now, always use occupation data
			
			downloadStatus = 'filtering';

			// Apply filters
			const filteredData = await applyFilters(urlParams, workbookData);
			filteredDataCount = filteredData.length;

			if (filteredData.length === 0) {
				throw new Error('No data matches your selection criteria');
			}

			// Generate filter summary
			await generateFilterSummary();

			downloadStatus = 'generating';

			// Generate and download Excel file
			const excelGenerator = new ExcelGenerator(filteredData, config);
			excelGenerator.download();

			downloadStatus = 'completed';

		} catch (err) {
			downloadError = err.message;
			downloadStatus = 'error';
		}
	}

	async function generateFilterSummary() {
		filterSummary = {};
		
		for (const [paramKey, values] of Object.entries(urlParams)) {
			const filter = getFilter(paramKey);
			if (filter) {
				const names = await filter.getNames(values);
				filterSummary[paramKey] = {
					displayName: downloadConfigs[paramKey]?.displayName || paramKey,
					items: names
				};
			}
		}
	}

	// Download on mount
	onMount(() => {
		performDownload();
	});
</script>

<svelte:head>
	<title>Data Download</title>
	<meta name="description" content="Downloading employment projection data" />
</svelte:head>

<div class="container-fluid position-absolute top-50 start-50 translate-middle">
	<div class="row text-center">
		<h1 class="display-2">Data Download</h1>
		
		<DownloadStatus status={downloadStatus} error={downloadError} dataCount={filteredDataCount} />
		
		{#if Object.keys(filterSummary).length > 0}
			<FilterSummary {filterSummary} />
		{/if}

		{#if downloadStatus === 'error'}
			<p class="text-muted fst-italic mt-3">
				<a href="/">Return to home page</a>
			</p>
		{:else if downloadStatus === 'completed'}
			<p class="text-muted fst-italic mt-3">
				If the download did not start automatically, please check your browser's download settings.
			</p>
		{:else}
			<p class="text-muted fst-italic mt-3">
				If there are any issues, <a href="/">please return to the home page</a>.
			</p>
		{/if}
	</div>
</div>