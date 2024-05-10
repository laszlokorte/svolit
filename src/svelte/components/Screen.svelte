<script>
	import { moveTo, press, release } from '$redux/features/pointer'
	import { svgAspectRatioSelector } from '$redux/features/viewport'
	import { svgViewBoxSelector, svgViewBoxRectSelector } from '$redux/features/camera'
	import { viewBoxScaleSelector } from '$redux/selectors/screen'
	import { useStoreContext } from '../context.svelte.js';
	import Screen from './Screen.svelte';
	import {eventToViewbox} from '$utils/svg';

	let [state, fns] = useStoreContext((s) => ({
		pointer: s.pointer,
		viewport: s.viewport,
		svgViewBox: svgViewBoxSelector(s),
		viewBoxRect: svgViewBoxRectSelector(s),
		svgAspectRatio: svgAspectRatioSelector(s),
    scaling: viewBoxScaleSelector(s),
	}), (d) => ({
		moveTo: (evt) => d(moveTo(eventToViewbox(evt))),
		press: (evt) => d(press()),
		release: (evt) => d(release()),
	}))

</script>

<svg class="screen" width={state.viewport.width} height={state.viewport.height} onpointermove={fns.moveTo} onpointerdown={fns.press} onpointerup={fns.release} viewBox={state.svgViewBox} preserveAspectRatio={state.svgAspectRatio}>
	<rect fill="pink" {...state.viewBoxRect} />
	<circle cx={state.pointer.x} cy={state.pointer.y} r="20" fill="white" class:pressed={state.pointer.pressed}></circle>
	<circle cx={0} cy={0} r="5" fill="black"></circle>
	<rect vector-effect="non-scaling-stroke" fill="none" stroke="purple" x={state.scaling.minX+10} y={state.scaling.minY+10} width={state.scaling.width-20} height={state.scaling.height-20} />

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