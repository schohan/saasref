<script>
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	export let page = 1;
	export let totalCount = 0;
	export let limit = 10;
	export let totalPages = 1;

	let showPageModal = false;
	let searchedPage = 1;

	$: {
		totalPages = Math.ceil(totalCount / limit);
	}

	function updatePage(nPage) {
		page = nPage > 0 ? nPage : 1;

		dispatch('paginate', page);
		window.scroll({
			top: 100,
			left: 0,
			behavior: 'smooth'
		});
	}

	$: {
		console.log('page , totalPages ' + page + ', ' + totalPages);
	}
</script>

<div class="btn-group justify-center">
	<button class="btn {page === 1 ? 'btn-disabled' : ''}" on:click={() => updatePage(page - 1)}>
		Previous
	</button>
	{#if totalPages > 7 && page > 3 && page < totalPages - 4}
		{#each [page - 2, page - 1, page, page + 1, page + 2, page + 3, page + 4] as currentPage}
			<button
				id={currentPage}
				class="btn"
				class:active={currentPage == page}
				on:click={() => updatePage(currentPage)}
			>
				{currentPage}
			</button>
		{/each}
	{:else if totalPages > 7 && page <= 3}
		{#each Array(7) as _, i}
			<button
				id={i + 1}
				class="btn"
				class:active={i + 1 == page}
				on:click={() => updatePage(i + 1)}
			>
				{i + 1}
			</button>
		{/each}
	{:else if totalPages > 7 && page >= totalPages - 4}
		{#each [totalPages - 6, totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as currentPage}
			<button
				id={currentPage}
				class="btn"
				class:active={currentPage == page}
				on:click={() => updatePage(currentPage)}
			>
				{currentPage}
			</button>
		{/each}
	{:else}
		{#each Array(totalPages) as _, i}
			<button
				id={i + 1}
				class="btn"
				class:active={i + 1 == page}
				on:click={() => updatePage(i + 1)}
			>
				{i + 1}
			</button>
		{/each}
	{/if}
	<button
		class="btn {page === totalPages ? 'btn-disabled' : ''}"
		on:click={() => updatePage(page + 1)}
	>
		Next
	</button>

	<div class="flex justify-center my-2">
		{totalPages} total pages.
		<span class="mx-2">Goto page</span>

		<form on:submit|preventDefault={() => updatePage(searchedPage)}>
			<input
				type="number"
				min="1"
				max={totalPages}
				bind:value={searchedPage}
				class="w-12 h-8 border mx-2 text-black"
			/>
			<button type="submit" class="rounded border p-1 bg-blue-300 hover:bg-blue-400">Go</button>
		</form>
	</div>
</div>

<style>
	.active {
		@apply bg-gray-300;
	}
	.btn {
		@apply rounded-full px-2;
	}

	.btn-disabled {
		@apply text-gray-400 cursor-none;
	}
</style>
