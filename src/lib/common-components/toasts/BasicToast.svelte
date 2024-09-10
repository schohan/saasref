<script>
	import { SvelteComponent, onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import { BasicToastTypes } from './BasicToastTypes';

	export let duration = 5;
	export let text;
	export let position = 'bottom-center';
	export let toastType = BasicToastTypes.DEFAULT;

	$: options = {
		duration: duration * 1000,
		position: position
	};

	onMount(async () => {
		if (toastType === BasicToastTypes.DEFAULT) {
			toast(text, options);
		} else if (toastType === BasicToastTypes.SUCCESS) {
			toast.success(text, options);
		} else if (toastType === BasicToastTypes.ERROR) {
			toast.error(text, options);
		}
	});
</script>

<Toaster />
