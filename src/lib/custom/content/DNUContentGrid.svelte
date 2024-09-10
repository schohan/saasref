<script>
	export let contentComponent;
	export let contentTitle = '';
	export let payload; // payload contains data and pagination objects
</script>

<div class="col-xl-9 col-lg-8 content-left-offset">
	<h3 class="page-title m-4">{contentTitle}</h3>
	<svelte:component this={contentComponent} bind:contentList={payload.data} />
</div>
