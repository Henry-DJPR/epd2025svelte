<script>
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Download Error</title>
	<meta name="description" content="Error downloading employment projection data" />
</svelte:head>

<div class="container-fluid position-absolute top-50 start-50 translate-middle">
	<div class="row text-center">
		<h1 class="display-2 text-danger">Download Error</h1>
		
		<div class="alert alert-danger mt-4" role="alert">
			<h4 class="alert-heading">Unable to Process Request</h4>
			<p class="mb-3">{page.error?.message || 'An unexpected error occurred'}</p>
			<hr>
			<p class="mb-0">
				Please check your URL parameters and try again, or 
				<a href="/" class="alert-link">return to the home page</a>.
			</p>
		</div>

		<div class="mt-4">
			<h5 class="text-muted">Common Issues:</h5>
			<ul class="text-start" style="max-width: max-content; margin: 0 auto;">
				<li>Invalid occupation codes (must be 4-digit ANZSCO codes)</li>
				<li>Invalid industry codes (must be 1-digit ANZSIC codes)</li>
				<li>Invalid region codes</li>
				<li>Missing or malformed parameters</li>
			</ul>
		</div>

		<div class="mt-4">
			<h6 class="text-muted">URL Format Examples:</h6>
			<div class="text-muted small">
				<code>/download/occupation=1111+2222</code><br>
				<code>/download/occupation=1111/industry=1</code><br>
				<code>/download/region=metro+barwon</code>
			</div>
		</div>
	</div>
</div>