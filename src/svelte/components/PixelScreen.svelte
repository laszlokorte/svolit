<script>
	import { onMount } from 'svelte'
	import { moveTo, press, release } from '$redux/features/pointer'
	import { setSize as resize } from '$redux/features/viewport'
	import { svgViewBoxRectSelector } from '$redux/features/camera'
	import { viewBoxScaleSelector } from '$redux/selectors/screen'
	import { useStoreContext } from '../context.svelte.js';
	import Screen from './Screen.svelte';
	import {eventToViewbox} from '$utils/canvas';

	let [stat, fns] = useStoreContext((s) => ({
		pointer: s.pointer,
		viewport: s.viewport,
		viewBoxRect: svgViewBoxRectSelector(s),
		scaling: viewBoxScaleSelector(s)
	}), (d) => ({
		moveTo: (evt) => d(moveTo(eventToViewbox(evt))),
		press: (evt) => d(press()),
		release: (evt) => d(release()),
    	resize: (width, height) => d(resize({width, height})),
	}))

	let canvas
	let ctx = $state()

	onMount(() => {
		const updateContext = (event) => {
			ctx = canvas.getContext('2d')
		}
	    const updateRealSize = (event) => {
	      fns.resize(canvas.offsetWidth, canvas.offsetHeight)
	    }

		
		updateContext()
		canvas.addEventListener("contextrestored", updateContext);
		window.addEventListener("resize", updateRealSize);
		
		return () => {
			canvas.removeEventListener("contextrestored", updateContext);
			window.removeEventListener("resize", updateRealSize);
		}
	})

	$effect(() => {
		if(!ctx) {
			return
		}
		ctx.clearRect(0, 0, stat.viewport.width, stat.viewport.height)
		ctx.save()
		ctx.translate(stat.viewport.width/2, stat.viewport.height/2)
		
		ctx.beginPath();
		ctx.fillStyle = "lightpink";
		ctx.rect(stat.viewBoxRect.x, stat.viewBoxRect.y, stat.viewBoxRect.width, stat.viewBoxRect.height);
		ctx.closePath();
		ctx.fill()

		ctx.beginPath();
		ctx.fillStyle = "white";
		if(stat.pointer.pressed) {
			ctx.fillStyle = "lightcoral";
		}
		ctx.arc(stat.pointer.x, stat.pointer.y, 20, 0, 2 * Math.PI);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.arc(0, 0, 5, 0, 2 * Math.PI);
		ctx.fill();

		ctx.restore()
	})

</script>

<canvas class="screen" width={stat.viewport.width} height={stat.viewport.height} onpointermove={fns.moveTo} onpointerdown={fns.press} onpointerup={fns.release} bind:this={canvas}></canvas>

<style>
	.screen {
		height: 100%;
		width: 100%;
		background: lightblue;
		display: block;
	}
</style>