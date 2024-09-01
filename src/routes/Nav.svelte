<script>
	import { page } from "$app/stores";

	let routeGroups = [
		{
			label: "Navigation",
			routes: [["/", "Home"]],
		},
		{
			label: "Sorting",
			routes: [
				["/quicksort", "Quicksort"],
				["/bubble-sort", "Bubble Sort"],
				["/selection-sort", "Selection Sort"],
			],
		},
		{
			label: "Math",
			routes: [["/matrix-multiplication", "Matrix Multiplication"]],
		},
	];
</script>

<div
	class="flex-shrink-0 p-3 border-end border-1 border-secondary"
	style="width: 280px;"
>
	<a
		href="/"
		class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
	>
		<svg class="bi me-2" width="30" height="24"
			><use xlink:href="#bootstrap"></use></svg
		>
		<span class="fs-5 fw-semibold">Collapsible</span>
	</a>
	<ul class="list-unstyled ps-0">
		{#each routeGroups as group}
			<li class="mb-1">
				<button
					class="btn btn-toggle align-items-center rounded collapsed"
					data-bs-toggle="collapse"
					data-bs-target={`#${group.label}-collapse`}
					aria-expanded="true"
				>
					{group.label}
				</button>
				<div
					class="collapse show"
					id={`${group.label}-collapse`}
					style=""
				>
					<ul
						class="btn-toggle-nav list-unstyled fw-normal pb-1 small"
					>
						{#each group.routes as route}
							<li class="nav-item mb-1">
								<a
									class="nav-link"
									class:active={$page.url.pathname ===
										route[0]}
									href={route[0]}>{route[1]}</a
								>
							</li>
						{/each}
					</ul>
				</div>
			</li>
		{/each}
	</ul>
</div>
