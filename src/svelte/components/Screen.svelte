<script>
	import { moveTo, press, release } from '$redux/features/pointer'
	import { svgAspectRatioSelector } from '$redux/features/viewport'
	import { svgViewBoxSelector } from '$redux/features/camera'
	import { useStoreContext } from '../context.svelte.js';
	import Screen from './Screen.svelte';
	import {eventToViewbox} from '$utils/svg';

	let [state, fns] = useStoreContext((s) => ({
		pointer: s.pointer,
		viewport: s.viewport,
		svgViewBox: svgViewBoxSelector(s),
		svgAspectRatio: svgAspectRatioSelector(s),
	}), (d) => ({
		moveTo: (evt) => d(moveTo(eventToViewbox(evt))),
		press: (evt) => d(press()),
		release: (evt) => d(release()),
	}))

</script>

<svg class="screen" width={state.viewport.width} height={state.viewport.height} onpointermove={fns.moveTo} onpointerdown={fns.press} onpointerup={fns.release} viewBox={state.svgViewBox} preserveAspectRatio={state.svgAspectRatio}>
	<circle cx={state.pointer.x} cy={state.pointer.y} r="20" fill="white" class:pressed={state.pointer.pressed}></circle>
</svg>

<style>
	.screen {
		background: lightblue;
		width: 100%;
		height: 100%;
	}

	.pressed {
		fill: lightcoral;
	}
</style>