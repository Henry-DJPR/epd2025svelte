<script>
	export let status = 'preparing';
	export let error = null;
	export let dataCount = 0;

	const statusMessages = {
		preparing: 'Preparing download...',
		validating: 'Validating parameters...',
		loading_data: 'Loading data...',
		filtering: 'Applying filters...',
		generating: 'Generating Excel file...',
		completed: 'Download completed!',
		error: 'Download failed'
	};

	const statusClasses = {
		preparing: 'text-primary',
		validating: 'text-info',
		loading_data: 'text-info',
		filtering: 'text-info',
		generating: 'text-warning',
		completed: 'text-success',
		error: 'text-danger'
	};
</script>

<div class="download-status mb-4" role="status" aria-live="polite">
	<p class="lead {statusClasses[status]}" aria-label="Download status: {statusMessages[status]}">
		{statusMessages[status]}
	</p>
	
	{#if status === 'error' && error}
		<div class="alert alert-danger mt-3" role="alert">
			<strong>Error:</strong> {error}
		</div>
	{/if}
	
	{#if status === 'completed' && dataCount > 0}
		<div class="alert alert-success mt-3" role="alert">
			<strong>Success:</strong> Downloaded {dataCount.toLocaleString()} records
		</div>
	{/if}
	
	{#if ['preparing', 'validating', 'loading_data', 'filtering', 'generating'].includes(status)}
		<div class="spinner-border text-primary mt-3" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	{/if}
</div>