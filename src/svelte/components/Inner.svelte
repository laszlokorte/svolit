<script>
	import { increment, decrement } from '$redux/features/counter'
	import { useStoreContext } from '../context.svelte.js';
	import Screen from './Screen.svelte';
	import PixelScreen from './PixelScreen.svelte';

	let [state, {incr, decr}] = useStoreContext((s) => ({
		value: s.counter.value,
	}), (d) => ({
      decr: () => d(decrement()),
      incr: () => d(increment()),
    }))

</script>

<div class="row">
	<Screen></Screen>
	<PixelScreen></PixelScreen>

	
	<div>
		Svelte working {state.value}
		<button onclick={incr}>Incr</button>
		<button onclick={decr}>Decr</button>
		<simple-greeting></simple-greeting>
	</div>
</div>