<script>
	import { afterUpdate } from "svelte";

	export let title;
	export let logs;

	let logger;
	afterUpdate(() => {
		scrollToBottom(logger);
	});

	const scrollToBottom = async (node) => {
		node.scroll({ top: node.scrollHeight, behavior: "instant" });
	};
</script>

<div
	class="h-100 p-2 d-flex flex-column align-items-start justify-content-start overflow-auto"
	bind:this={logger}
>
	<span class="logger-text">{title || "Logger"}</span>
	<!-- <span>{JSON.stringify(array2D)}</span> -->

	{#each logs as log}
		{#if log.length > 50}
			<span>{log.substring(0, 50) + "..."}</span>
		{:else}
			<span>{log}</span>
		{/if}
	{/each}
</div>

<style>
	.logger-text {
		text-wrap: wrap;
	}
</style>
