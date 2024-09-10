<script>
	import BasicToast from './BasicToast.svelte';
	import { BasicToastTypes } from './BasicToastTypes';
	export let text;
</script>

<BasicToast {text} position={'top-center'} toastType={BasicToastTypes.DEFAULT} />
