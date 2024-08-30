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
	<span>{title || "Logger"}</span>
	<!-- <span>{JSON.stringify(array2D)}</span> -->

	{#each logs as log}
		<span>{log}</span>
	{/each}
</div>
