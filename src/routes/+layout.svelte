<script>
	import { navigating } from "$app/stores";
	import Nav from "./Nav.svelte";
</script>

{#if $navigating}
	<p>Loading...</p>
{/if}

<div class="vh-100 d-flex flex-row align-items-stretch">
	<Nav />

	<main class="flex-grow-1">
		<slot />
	</main>
</div>
