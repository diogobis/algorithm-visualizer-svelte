<script>
	import Array1DVisualizer from "$lib/Array1DVisualizer/index.svelte";
	import ChartBarVisualizer from "$lib/ChartBarVisualizer/index.svelte";

	import Logger from "$lib/Logger/index.svelte";
	import AlgorithmInfo from "$lib/AlgorithmInfo/index.svelte";

	import { sleep, InfoBuilder, random1DArray } from "$lib/index.js";

	let info = new InfoBuilder();
	info.addText("Complexity: O(n log n)");
	info.addText(
		"Quicksort is a highly efficient sorting algorithm that works by dividing a list into smaller sublists and then recursively sorting those sublists. It's a divide-and-conquer algorithm that's often considered one of the fastest sorting algorithms in practice."
	);
	info.addText("Here's a simplified explanation of how quicksort works:");
	info.addOrderedList([
		"Choose a pivot: Select a random element from the list to be the pivot.",
		"Partition: Rearrange the list so that all elements smaller than the pivot are on one side, and all elements larger than the pivot are on the other side.   ",
		"Recursively sort: Recursively apply quicksort to the sublists on both sides of the pivot.",
	]);

	info.addBlock(`function quicksort(array) {
  if (array.length <= 1) {
    return array;
  }

  var pivot = array[array.length-1];
  
  var left = []; 
  var right = [];

  for (var i = 1; i < array.length; i++) {
    array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
  }

  return quicksort(left).concat(pivot, quicksort(right));
};`);

	info.addImage("../../../static/images/quicksort.png");

	const DELAY = 0.5;
	let logs = [];

	let array = random1DArray(200, true);

	let selected = new Set();
	let accessed = new Set();
	let unused = new Set();

	selected = selected;

	async function quicksort(input, startingIndex = 0) {
		accessed.clear();
		accessed = accessed;

		unused.clear();
		if (
			startingIndex != array.length &&
			startingIndex != array.length - 1
		) {
			for (let i = 0; i < array.length; i++) {
				if (i < startingIndex || i >= startingIndex + input.length) {
					unused.add(i);
				}
			}
		}
		unused = unused;

		if (input.length <= 1) {
			return input;
		}

		let left = [];
		let right = [];

		// let pivotIndex = Math.floor(input.length / 2);
		// let pivot = input[pivotIndex];

		let pivotIndex = input.length - 1;
		let pivot = input[pivotIndex];

		logs.push(`Pivot is [${pivotIndex}]=${pivot}`);
		logs = logs;

		accessed.add(startingIndex + pivotIndex);
		accessed.add("0:" + (startingIndex + pivotIndex));
		accessed = accessed;

		await sleep(DELAY);

		for (let i = 0; i < input.length; i++) {
			if (i !== input.length - 1) {
				let value = input[i];
				if (value <= pivot) {
					selected.add(startingIndex + i);
					selected.add("0:" + i);
					selected = selected;
					left.push(value);
					await sleep(DELAY);
				}
			}
		}

		selected.clear();
		selected = selected;

		for (let i = 0; i < input.length; i++) {
			if (i !== input.length - 1) {
				let value = input[i];
				if (value > pivot) {
					selected.add(startingIndex + i);
					selected.add("0:" + i);
					selected = selected;
					right.push(value);
					await sleep(DELAY);
				}
			}
		}

		logs.push(`Left is [${left.join(",")}]`);
		logs.push(`Right is [${right.join(",")}]`);
		logs = logs;

		selected.clear();
		selected = selected;

		let joint = new Array().concat(left, pivot, right);
		for (let i = startingIndex; i < startingIndex + joint.length; i++) {
			selected.add(i);
			selected.add("0:" + i);
			selected = selected;
			array[i] = joint[i - startingIndex];
			await sleep(DELAY);
			selected.clear();
			selected = selected;
		}

		await sleep(DELAY);

		logs.push("===============================");
		logs = logs;

		unused.clear();
		unused = unused;

		return new Array().concat(
			await quicksort(left, startingIndex),
			pivot,
			await quicksort(right, startingIndex + left.length + 1)
		);
	}

	quicksort(array);
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
		<Logger title="Quicksort Log" {logs}></Logger>
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
