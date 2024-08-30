<script>
	import { Highlight } from "svelte-highlight";
	import { javascript } from "svelte-highlight/languages";

	export let elements;
</script>

<div class="d-flex flex-column gap-3 align-items-start vh-100 max-vh-100 p-3 overflow-auto">
	{#each elements as element}
		{#if element.type == "text"}
			<span>{element.content}</span>
		{:else if element.type == "block"}
			<!-- <div class="card w-100">
				<div class="card-body">
					<pre>{element.content}</pre>
				</div>
			</div> -->
			<Highlight
				class="rounded code-block"
				language={javascript}
				code={element.content}
			></Highlight>
		{:else if element.type == "image"}
			<img class="rounded" src={element.content} alt="" />
		{:else if element.type == "olist"}
			<ol>
				{#each element.content as item}
					<li>{item}</li>
				{/each}
			</ol>
		{:else if element.type == "ulist"}
			<ul>
				{#each element.content as item}
					<li>{item}</li>
				{/each}
			</ul>
		{/if}
	{/each}
</div>
