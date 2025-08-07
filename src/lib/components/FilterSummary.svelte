<script>
	export let filterSummary = {};
</script>

<div class="filter-summary mt-4" role="region" aria-label="Filter selection summary">
	{#each Object.entries(filterSummary) as [paramKey, summary]}
		<div class="filter-group mb-3">
			<h5 class="text-muted" id="filter-{paramKey}">{summary.displayName} Selection:</h5>
			
			{#if summary.items.length === 1}
				<p class="lead">
					<strong>{summary.items[0].name}</strong>
				</p>
			{:else if summary.items.length > 8}
				<p class="lead">
					{summary.items.length} {summary.displayName.toLowerCase()}s selected
				</p>
			{:else}
				<div class="row justify-content-center">
					<ul class="text-start" style="max-width: max-content;" aria-labelledby="filter-{paramKey}">
						{#each summary.items as item}
							<li>
								<strong>{item.name}</strong>
								{#if item.code}
									<span class="text-muted">({item.code})</span>
								{/if}
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	{/each}
</div>