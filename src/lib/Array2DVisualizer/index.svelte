<script>
	export let title;
	export let array2D;
	export let selected;

	let cols = new Array(array2D[0].length).fill(0).map((_, i) => i);
</script>

<div
	class="h-100 p-2 d-flex flex-column align-items-center justify-content-center"
>
	<span>{title || "Array 2D Visualizer"}</span>
	<!-- <span>{JSON.stringify(array2D)}</span> -->

	<table class="table flex-grow-0 w-auto">
		{#each array2D as row, r}
			{#if r == 0}
				<tr>
					{#each cols as cols_id}
						{#if cols_id == 0}
							<th></th>
						{/if}

						<th>
							<span>{cols_id}</span>
						</th>
					{/each}
				</tr>
			{/if}

			<tr>
				{#each row as cell, c}
					{#if c == 0}
						<th>
							<span>{r}</span>
						</th>
					{/if}
					<td
						class="border border-1"
						class:select={selected.has(r + ":" + c)}
					>
						{cell}
					</td>
				{/each}
			</tr>
		{/each}
	</table>
</div>
