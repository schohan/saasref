<script>
	// @ts-nocheck
	import CardsGrid from './CardsGrid.svelte';
	import Pagination from './Pagination.svelte';
	import { getContent } from '$lib/custom/dataloader.js';
	import CatsSubcats from './CatsSubcats.svelte';
	import { page } from '$app/stores';

	export let data;
	let categories = data.categories;
	let selectedCat = data.selectedCat;

	let payloadWrapper;
	let pagination;
	let baseImagePath = data.config?.baseImagePath; // assign base image path to own variable as data will be overridden

	// ==== functions ====
	async function paginate(e) {
		const queryString = `limit=${pagination.limit}&skip=${e.detail.skip}`;
		// console.log(
		// 	'**** ContentPage: paginate: selectedCat=' + selectedCat + ', queryString ' + queryString
		// );
		const resp = await getContent(fetch, selectedCat, queryString);
		data = resp;
	}

	$: {
		data = data;
		payloadWrapper = data.payload;
		pagination = payloadWrapper.payload.pagination;
	}
</script>

<!-- Page Content
================================================== -->
<div class="">
	<div class="full-page-container overflow-auto">
		<CatsSubcats bind:selectedCat bind:categories />
		<div class="col-xl-9 col-lg-8 content-left-offset relative">
			<div class="d-flex justify-content-between my-2">
				<p class="mt-4 h4 page-title text-capitalize text-primary ml-10">
					{$page.data.pageMetaTags?.title}
				</p>
				<Pagination bind:pagination on:pageClicked={paginate} />
			</div>
			<CardsGrid bind:selectedCat bind:baseImagePath bind:data />
			<Pagination bind:pagination on:pageClicked={paginate} />
		</div>
	</div>
</div>
