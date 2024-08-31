<script>
	// import Array2DVisualizer from "$lib/Array2DVisualizer/index.svelte";
	import Array2DVisualizer from "../Array2DVisualizer/index.svelte";

	export let title;
	export let array;
	export let selected;
	export let accessed;
</script>

<Array2DVisualizer
	title={title || "Algorithm 1D Visualizer"}
	{selected}
	{accessed}
	array2D={[array]}
></Array2DVisualizer>
