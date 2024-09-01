<script>
	import Array2DVisualizer from "$lib/Array2DVisualizer/index.svelte";
	import Logger from "$lib/Logger/index.svelte";
	import AlgorithmInfo from "$lib/AlgorithmInfo/index.svelte";

	import { sleep, InfoBuilder } from "$lib/index.js";

	let info = new InfoBuilder();
	info.addText("Complexity: O(n³)");
	info.addText(
		"Matrix multiplication is a mathematical operation that involves multiplying elements of two matrices together in a specific way. The result is another matrix."
	);
	info.addUnorderedList([
		"Dimensions matter: The number of columns in the first matrix must equal the number of rows in the second matrix.",
		"Element-wise multiplication: Each element in the resulting matrix is calculated by multiplying corresponding elements from the two original matrices.",
		"Row-column product: The product of a row in the first matrix and a column in the second matrix is a single number.",
	]);
	info.addText("Example:");
	info.addBlock(`A = [[1, 2],
     [3, 4]]
B = [[5, 6],
     [7, 8]]
`);
	info.addText(
		"The resulting matrix C will have the same dimensions as the number of rows in A and the number of columns in B. In this case, C will be a 2x2 matrix."
	);
	info.addText(
		"To find the element in the first row, first column of C, we multiply the corresponding elements from the first row of A and the first column of B and add the products:"
	);
	info.addBlock(`C[0][0] = (1 * 5) + (2 * 7) = 19`);
	info.addText("Similarly, we can calculate the other elements of C.");
	info.addImage("images/matrix_multiplication.jpg");
	info.addBlock(`function matrixMultiplication(A, B) {
	if (A.length !== B[0].length) return null;

	let n = A.length;
	matrixC = new Array(n).fill(0).map(() => new Array(n).fill(0));
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			for (let p = 0; p < n - 1; p++) {
				matrixC[i][j] += A[i][p] * B[p][j];
			}
		}
	}
	
	return matrixC;
}`);

	const DELAY = 200;
	let logs = [];

	let matrixA = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[10, 11, 12],
	];
	let selectedA = new Set();
	let accessedA = new Set();

	let matrixB = [
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[9, 10, 11, 12],
	];
	let selectedB = new Set();
	let accessedB = new Set();

	let matrixC = [];
	let selectedC = new Set();
	let accessedC = new Set();

	async function matrixMultiplication(A, B) {
		if (A.length !== B[0].length) return null;
		let n = A.length;
		matrixC = new Array(n).fill(0).map(() => new Array(n).fill(0));
		await sleep(DELAY);
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				selectedC.add(i + ":" + j);
				selectedC = selectedC;
				for (let p = 0; p < n - 1; p++) {
					selectedA.add(i + ":" + p);
					selectedB.add(p + ":" + j);

					selectedA = selectedA;
					selectedB = selectedB;

					logs.push(
						`Add A[${i}][${p}] * B[${p}][${j}] to C[${i}][${j}]`
					);
					logs = logs;

					matrixC[i][j] += A[i][p] * B[p][j];
					await sleep(DELAY);
				}

				logs.push(`C[${i}][${j}] is ${matrixC[i][j]}`);
				logs.push("====================");
				logs = logs;

				selectedA.clear();
				selectedB.clear();
				selectedA = selectedA;
				selectedB = selectedB;

				selectedC.delete(i + ":" + j);
				selectedC = selectedC;
			}
		}
	}

	matrixMultiplication(matrixA, matrixB);
</script>

<div class="vh-100 max-h-100 overflow-hidden parent">
	<div class="div1">
		<Array2DVisualizer
			title="Matrix A"
			array2D={matrixA}
			selected={selectedA}
			accessed={accessedA}
		></Array2DVisualizer>
	</div>

	<div class="div2 border-bottom border-top">
		<Array2DVisualizer
			title="Matrix B"
			array2D={matrixB}
			selected={selectedB}
			accessed={accessedB}
		></Array2DVisualizer>
	</div>

	<div class="div3">
		<Array2DVisualizer
			title="Matrix C"
			array2D={matrixC}
			selected={selectedC}
			accessed={accessedC}
		></Array2DVisualizer>
	</div>

	<div class="div5 border-top">
		<Logger title="Matrix Multiplication Log" {logs}></Logger>
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
		grid-area: 1 / 2 / 5 / 3;
	}
	.div5 {
		grid-area: 4 / 1 / 5 / 2;
	}

	.div1,
	.div2,
	.div3,
	.div5 {
		max-height: 25vh;
		height: 25vh;
	}
</style>
