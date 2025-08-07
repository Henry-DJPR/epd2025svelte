<script>
	import '$lib/scss/styles.scss';
	let { children } = $props();
</script>

<div class="app" role="application" aria-label="Employment Projections Data Download Service">
	<nav class="position-absolute p-2 top-0 start-0 fst-italic" aria-label="Navigation">
		<a
			class="text-muted"
			href="https://app.powerbi.com/view?r=eyJrIjoiMzc5YjdkNWEtNWI2Yi00ZTA1LThiMWQtMzMwYjFlYWUwYzEwIiwidCI6IjcyMmVhMGJlLTNlMWMtNGIxMS1hZDZmLTk0MDFkNjg1NmUyNCJ9"
			aria-label="Return to Employment Projections Dashboard"
		>
			⏴Back to dashboard
		</a>
	</nav>

	<main>
		{@render children()}
	</main>

	<footer class="position-absolute bottom-0 w-100">
		<p class="w-100 text-center text-muted">© Government of Victoria, 2025</p>
	</footer>
</div>
