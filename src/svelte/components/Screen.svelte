<script>
	import { moveTo, press, release } from '$redux/features/pointer'
	import { useStoreContext } from '../context.svelte.js';
	import Screen from './Screen.svelte';
	import {eventToViewbox} from '$utils/svg';

	let [state, fns] = useStoreContext((s) => ({
		pointer: s.pointer,
	}), (d) => ({
		moveTo: (evt) => d(moveTo(eventToViewbox(evt))),
		press: (evt) => d(press()),
		release: (evt) => d(release()),
	}))

</script>

<svg onpointermove={fns.moveTo} onpointerdown={fns.press} onpointerup={fns.release} viewBox="-500 -500 1000 1000">
	<circle cx={state.pointer.x} cy={state.pointer.y} r="20" fill="white" class:pressed={state.pointer.pressed}></circle>
</svg>

<style>
	svg {
		background: lightblue;
		max-width: 20em;
	}

	.pressed {
		fill: lightcoral;
	}
</style>