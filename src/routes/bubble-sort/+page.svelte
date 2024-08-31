<script>
	import Array1DVisualizer from "$lib/Array1DVisualizer/index.svelte";
	import ChartBarVisualizer from "$lib/ChartBarVisualizer/index.svelte";

	import Logger from "$lib/Logger/index.svelte";
	import AlgorithmInfo from "$lib/AlgorithmInfo/index.svelte";

	import { sleep, InfoBuilder } from "$lib/index.js";

	let info = new InfoBuilder();
	info.addText("Complexity: O(n²)");
	info.addText(
		"Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent pairs of elements, and swaps them if they are in the wrong order. This process is repeated until no swaps are needed, indicating that the list is sorted."
	);
	info.addText("Here's a simplified explanation of how bubble sort works:");

	info.addOrderedList([
		"Compare and swap: Start at the beginning of the list and compare the first two elements. If the first element is larger than the second, swap them.   ",
		"Repeat: Move to the next pair of elements and repeat the comparison and swap process.",
		"Iterate: Continue this process until you reach the end of the list.",
		"Repeat passes: Repeat the entire process until no swaps are made during a pass, indicating that the list is sorted.",
	]);

	info.addBlock(`function bubbleSort() {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			if (array[i] < array[j]) {
				let aux = array[i];
				array[i] = array[j];
				array[j] = aux;
			}

		}
	}
}`);

	info.addImage("../../../static/images/bubblesort.png");

	const DELAY = 25;
	let logs = [];

	let array = new Array(25)
		.fill(0)
		.map((_) => Math.floor(Math.random() * 24) + 1);
	let selected = new Set();
	let accessed = new Set();

	selected = selected;

	async function bubbleSort() {
		for (let i = 0; i < array.length; i++) {
			for (let j = 0; j < array.length; j++) {
				selected.add(i);
				selected.add(j);
				selected.add("0:" + i);
				selected.add("0:" + j);
				selected = selected;

				if (array[i] < array[j]) {
					let aux = array[i];
					array[i] = array[j];
					array[j] = aux;

					selected.delete(i);
					selected.delete(j);
					selected.delete("0:" + i);
					selected.delete("0:" + j);
					selected = selected;

					accessed.add(i);
					accessed.add(j);
					accessed.add("0:" + i);
					accessed.add("0:" + j);
					accessed = accessed;
					logs.push(
						`Swapped [${i}]=${array[i]} and [${j}]=${array[j]}`
					);
					logs = logs;

					await sleep(DELAY);
					accessed.clear();
					accessed = accessed;
				}

				await sleep(DELAY);
				selected.clear();
				selected = selected;
			}

			logs.push("============================");

			logs = logs;
		}
	}

	bubbleSort(array);
</script>

<div class="vh-100 max-h-100 overflow-hidden parent">
	<div class="div1">
		<!-- <canvas bind:this={canvas}></canvas> -->
		<ChartBarVisualizer data={array} {selected} {accessed}
		></ChartBarVisualizer>
	</div>

	<div class="div2 w-100 max-w-100 overflow-auto">
		<Array1DVisualizer
			{array}
			{selected}
			{accessed}
			title="Array 1D Visualizer"
		></Array1DVisualizer>
	</div>

	<div class="div3 border-top">
		<Logger title="BubbleSort Log" {logs}></Logger>
	</div>

	<div class="div4 border-start border-secondary">
		<AlgorithmInfo elements={info.elements}></AlgorithmInfo>
	</div>
</div>

<style>
	.parent {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(4, auto);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}

	.div1 {
		grid-area: 1 / 1 / 2 / 2;
	}
	.div2 {
		grid-area: 2 / 1 / 3 / 2;
	}
	.div3 {
		grid-area: 3 / 1 / 4 / 2;
	}
	.div4 {
		grid-area: 1 / 2 / 4 / 3;
	}

	.div1,
	.div2,
	.div3 {
		max-height: calc(100vh / 3);
		height: calc(100vh / 3);
	}
</style>
