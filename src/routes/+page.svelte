<svelte:head>
	<title>Employment Projections Data Download Service</title>
	<meta name="description" content="Employment forecast data download service with support for occupation, industry, and region-based downloads" />
</svelte:head>

<div class="container-fluid position-absolute top-50 start-50 translate-middle">
	<div class="row text-center">
		<h1 class="display-2" id="main-heading">Employment forecast data download service</h1>
		<p class="lead text-muted">
			Please access this site from the 2025 Employment Projections Dashboard for downloads.
		</p>
		
		<section class="mt-5" aria-labelledby="url-formats-heading">
			<h3 class="text-muted" id="url-formats-heading">Supported URL Formats:</h3>
			<div class="row justify-content-center mt-3">
				<div class="col-md-8">
					<div class="text-start">
						<h5 id="occupation-downloads">Occupation Downloads:</h5>
						<code class="d-block mb-2">/download/occupation=1111+2222+3333</code>
						<code class="d-block mb-2">/occupation/1111+2222+3333</code>
						
						<h5 class="mt-4" id="multi-dimensional-downloads">Multi-dimensional Downloads:</h5>
						<code class="d-block mb-2">/download/occupation=1111/industry=1</code>
						<code class="d-block mb-2">/download/occupation=1111/region=metro</code>
						<code class="d-block mb-2">/download/industry=1+2/region=metro+barwon</code>
						
						<div class="mt-4 text-muted small" role="region" aria-labelledby="parameters-heading">
							<p id="parameters-heading"><strong>Parameters:</strong></p>
							<ul class="text-start" aria-labelledby="parameters-heading">
								<li><strong>occupation</strong>: 4-digit ANZSCO codes (e.g., 1111, 2222)</li>
								<li><strong>industry</strong>: 1-digit ANZSIC codes (e.g., 1, 2, 3)</li>
								<li><strong>region</strong>: Region codes (e.g., metro, barwon, gippsland)</li>
							</ul>
							<p>Use <code>+</code> to separate multiple values within a parameter.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>
