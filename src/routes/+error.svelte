<script>
	import { page } from '$app/state';
</script>

<div class="container-fuild position-absolute top-50 start-50 translate-middle">
	<div class="row text-center">
		<h1 class="display-2">{page.status}</h1>
		<p class="lead text-muted">{page.error.message}</p>
	</div>
</div>
