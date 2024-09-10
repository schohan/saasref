<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// pagination object {limit:0, skip:0, total:0}
	export let pagination;
	let limit, skip, total;

	let totalPages, page;
	let hasMorePages = false;

	$: {
		limit = pagination?.limit;
		total = pagination?.total;
		skip = pagination?.skip;
		page = skip / limit + 1;
		totalPages = Math.ceil(total / limit);
		hasMorePages = totalPages > page;
	}

	// send message to skip
	function paginate(pageNum) {
		if (pageNum > totalPages || pageNum < 1) {
			return false;
		}
		page = pageNum;
		const skip = (page - 1) * limit;

		// console.log(
		// 	'Clicked Paginate: pagenum ' +
		// 		pageNum +
		// 		' limit ' +
		// 		limit +
		// 		' skip ' +
		// 		skip +
		// 		' total ' +
		// 		total
		// );

		dispatch('pageClicked', {
			skip
		});
	}
</script>

<!-- Pagination -->
<div class="clearfix" />
<div class="row margin-top-20">
	<div class="col-md-12">
		<!-- Pagination -->
		<div class="pagination-container d-flex justify-content-end">
			<nav class="pagination">
				<ul>
					<li class="pagination-arrow">
						<a href="#" on:click={() => paginate(page - 1)}
							><i class="icon-material-outline-keyboard-arrow-left" /></a
						>
					</li>
					<li class="button">
						<a href="#" class="pagination-arrow" on:click={() => paginate(page + 1)}
							><i class="icon-material-outline-keyboard-arrow-right" /></a
						>
					</li>
					<!-- <div>Page {page}</div> -->
				</ul>
			</nav>
		</div>
		<!-- <div class="mx-4 justify-center items-center">
			Page {page} of {totalPages}
		</div> -->
	</div>
</div>
<!-- Pagination / End -->
