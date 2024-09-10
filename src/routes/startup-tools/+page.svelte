<script>
	import ContentPage from './ContentPage.svelte';
	import { page } from '$app/stores';

	export let data;

	//console.log('+page.svelte == ' + JSON.stringify(data.payload));
</script>

<div class="full-page-container vh-100">
	<ContentPage bind:data />
</div>
