<script>
	import { onMount, afterUpdate } from "svelte";
	import { Chart } from "chart.js/auto";

	export let data;
	export let selected;
	export let accessed;

	let canvas;
	let chart;
	onMount(() => {
		chart = new Chart(canvas, {
			type: "bar",
			data: {
				labels: data.map((value) => `${value}`),
				datasets: [
					{
						backgroundColor: data.map((_, index) => {
							return accessed.has(index)
								? "rgb(240, 64, 64)"
								: selected.has(index)
									? "rgb(80, 80, 255)"
									: "rgb(120,120,120)";
						}),
						data: data.map((value) => value),
					},
				],
			},
			options: {
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
							},
						},
					],
				},
				legend: {
					display: false,
				},
				plugins: {
					legend: {
						display: false,
					},
					title: {
						display: false,
					},
				},

				animation: false,
				animations: {
					colors: false,
				},
				responsive: true,
				maintainAspectRatio: false,
			},
		});
	});

	afterUpdate(() => {
		chart.data = {
			labels: data.map((value) => `${value}`),
			datasets: [
				{
					backgroundColor: data.map((_, index) => {
						return accessed.has(index)
							? "rgb(240, 64, 64)"
							: selected.has(index)
								? "rgb(80, 80, 255)"
								: "rgb(120,120,120)";
					}),
					data: data.map((value) => value),
				},
			],
		};

		chart.update();
	});
</script>

<canvas bind:this={canvas}></canvas>
