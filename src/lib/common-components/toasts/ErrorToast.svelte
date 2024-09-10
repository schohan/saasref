<script>
	import BasicToast from './BasicToast.svelte';
	import { BasicToastTypes } from './BasicToastTypes';
	export let text;
</script>

<BasicToast text={'ERROR: ' + text} position={'top-center'} toastType={BasicToastTypes.ERROR} />
