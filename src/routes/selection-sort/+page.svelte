<script>
	import Array1DVisualizer from "$lib/Array1DVisualizer/index.svelte";
	import ChartBarVisualizer from "$lib/ChartBarVisualizer/index.svelte";

	import Logger from "$lib/Logger/index.svelte";
	import AlgorithmInfo from "$lib/AlgorithmInfo/index.svelte";

	import { sleep, InfoBuilder, random1DArray } from "$lib/index.js";

	let info = new InfoBuilder();
	info.addText("Complexity: O(n²)");
	info.addText(
		"Selection Sort is a simple sorting algorithm that works by repeatedly finding the minimum element in the unsorted portion of the array and swapping it with the first element of the unsorted portion."
	);
	info.addText("Here's how it works:");

	info.addOrderedList([
		"Find the minimum: Find the smallest element in the unsorted part of the array.",
		"Swap: Swap the smallest element with the first element of the unsorted part.",
		"Repeat: Repeat steps 1 and 2 until the entire array is sorted.",
	]);

	info.addBlock(`function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let min = array[i];
        let minIndex = i;
        
        for (let j = i; j < array.length; j++) {
            if (array[j] < min) {
                min = array[j];
                minIndex = j;
            }
        }

        let aux = array[i];
        array[i] = array[minIndex];
        array[minIndex] = aux;
    }
}`);

	info.addImage("images/selection-sort.jpg");

	const DELAY = 25;
	let logs = [];

	let array = random1DArray(100, true);
	let selected = new Set();
	let accessed = new Set();
	let unused = new Set();

	async function selectionSort() {
		for (let i = 0; i < array.length; i++) {
			let min = array[i];
			let minIndex = i;

			if (i == array.length - 1) {
				unused.clear();
			} else {
				unused.add(i - 1);
			}
			unused = unused;

			selected.add(i);
			selected.add("0:" + i);

			selected.add(minIndex);
			accessed.add("0:" + minIndex);

			selected = selected;
			accessed = accessed;

			for (let j = i; j < array.length; j++) {
				if (array[j] < min) {
					accessed.delete(minIndex);
					accessed.delete("0:" + minIndex);

					min = array[j];
					minIndex = j;

					accessed.add(minIndex);
					accessed.add("0:" + minIndex);

					accessed = accessed;
					await sleep(DELAY);
				} else {
					selected.add(j);
					selected.add("0:" + j);
					selected = selected;
				}

				accessed.clear();
			}

			logs.push(`Swapped [${i}] and [${minIndex}]`);
			logs = logs;

			let aux = array[i];
			array[i] = array[minIndex];
			array[minIndex] = aux;

			selected.clear();

			await sleep(DELAY);
		}
	}

	selectionSort();
</script>

<div class="vh-100 max-h-100 overflow-hidden parent">
	<div class="div1">
		<!-- <canvas bind:this={canvas}></canvas> -->
		<ChartBarVisualizer data={array} {selected} {accessed} {unused}
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
		<Logger title="Selection Sort Log" {logs}></Logger>
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
