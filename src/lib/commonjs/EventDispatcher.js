import { createEventDispatcher } from 'svelte';

export function dispatchEvent(key, data) {
	const dispatch = createEventDispatcher();
	dispatch(key, data);
}
