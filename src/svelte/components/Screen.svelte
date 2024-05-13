<script>
	import { useStoreContext } from '../context.svelte.js';
	import { screenAdapter } from '$adapters/screen';
	import { worldAdapter } from '$adapters/world';
	
  	let [state, fns] = screenAdapter(useStoreContext)
  	let [world, _] = worldAdapter(useStoreContext)

  	function worldX(x, y) {
  		return state.camTransform.scaleX * (x + state.camTransform.translateX)
  	}

  	function worldY(x, y) {
  		return state.camTransform.scaleY * (y + state.camTransform.translateY)
  	}

  	function worldXY(x, y) {
  		return [
  			state.camTransform.scaleX * (x + state.camTransform.translateX),
  			state.camTransform.scaleY * (y + state.camTransform.translateY)
  		]
  	}
</script>

<svg onwheel={fns.zoomWheel} class="screen" width={state.viewport.width} height={state.viewport.height} onpointermove={fns.panMove} onpointerdown={fns.panStart} onpointerup={fns.panStop} viewBox={state.originSvgViewBox} preserveAspectRatio={state.svgAspectRatio}>
	<rect fill="pink" {...state.originViewBoxRect} />
	<circle cx={state.pointer.x} cy={state.pointer.y} r="20" fill="white" class:pressed={state.pressed}></circle>
	<circle cx={worldX(0,0)} cy={worldY(0,0)} r="5" fill="black"></circle>
	
	<rect stroke-width="2" vector-effect="non-scaling-stroke" fill="none" stroke="purple" x={state.scaling.minX+10} y={state.scaling.minY+10} width={state.scaling.width-20} height={state.scaling.height-20} />

	{#each world.visiblePolygons as poly}
		<polygon points={poly.vertices.map(({x,y}) => `${x}, ${y}`).join(',')} fill="green" />
	{/each}
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