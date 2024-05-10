<script>
	import { useStoreContext } from '../context.svelte.js';
	import { eventToViewbox } from '$utils/svg';
	import { screenAdapter } from '$adapters/screen';
	
  	let [state, fns] = screenAdapter(useStoreContext, eventToViewbox)
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