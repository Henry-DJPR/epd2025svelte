<script>
	// Imports & high level definitions
	import { page } from '$app/state';
	import { error } from '@sveltejs/kit';
	import { extractUnit } from '$lib/utils';
	import anzsco2021 from '$lib/taxonomies/anzsco2021_nested.json';
	const anzsco = page.params.anzsco.split('+').map(Number);

	// All submajors & codes
	const anzsco4 = extractUnit(anzsco2021);
	let anzsco4Codes = [];
	anzsco4.forEach((unit) => {
		anzsco4Codes.push(unit.code);
	});

	// Error handling for invalid ANZSCO codes
	if (!anzsco.every((code) => anzsco4Codes.includes(code))) {
		error(404, 'Occupation not found');
	}
</script>

<svelte:head>
	<title>Occupation data download</title>
	<meta name="description" content="Downloading employment projection occupation data" />
</svelte:head>

<div class="container-fuild position-absolute top-50 start-50 translate-middle">
	<div class="row text-center">
		<h1 class="display-2">Occupation data download</h1>
		{#if anzsco.length === 1}
			<p class="lead text-muted">
				You have selected the occupation: <strong
					>{anzsco4.find((sub) => sub.code === anzsco[0]).name}</strong
				>.
			</p>
		{:else if anzsco.length > 8}
			<p class="lead text-muted">You have selected {anzsco.length} occupations.</p>
		{:else if anzsco.length > 1}
			<p class="lead text-muted">You have selected the following occupations:</p>
			<div class="row justify-content-center">
				<ul class="text-start" style="max-width: max-content;">
					{#each anzsco as code}
						<li>
							<strong>{anzsco4.find((sub) => sub.code === code).name}</strong>
						</li>
					{/each}
				</ul>
			</div>
		{:else}
			<p class="lead text-muted">No occupation selected.</p>
		{/if}
		<p class="text-muted fst-italic">
			If the download has not stated automatically, <a href="/">please click here</a>.
		</p>
	</div>
</div>
