<script>
	import { setStoreContext } from '../context.svelte.js';
	import Inner from './Inner.svelte';

	const {store} = $props()

	setStoreContext(store)

</script>

<Inner></Inner>