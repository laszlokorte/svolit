<script>
	import { onMount } from 'svelte'
	import { moveTo, press, release } from '$redux/features/pointer'
	import { useStoreContext } from '../context.svelte.js';
	import Screen from './Screen.svelte';
	import {eventToViewbox} from '$utils/canvas';

	let [stat, fns] = useStoreContext((s) => ({
		pointer: s.pointer,
		viewport: s.viewport,
	}), (d) => ({
		moveTo: (evt) => d(moveTo(eventToViewbox(evt))),
		press: (evt) => d(press()),
		release: (evt) => d(release()),
	}))

	let canvas
	let size = $state({width: 0, height: 0})
	let ctx = $state()

	onMount(() => {
		const updateContext = (event) => {
			ctx = canvas.getContext('2d')
			size.width = canvas.width
			size.height = canvas.height
		}
		
		updateContext()
		addEventListener("contextrestored", updateContext);
		
		return () => {
			removeEventListener("contextrestored", updateContext);
		}
	})

	$effect(() => {
		if(!ctx) {
			return
		}
		ctx.clearRect(0, 0, size.width, size.height)
		ctx.save()
		ctx.translate(stat.viewport.width/2, stat.viewport.height/2)
		ctx.beginPath();
		ctx.arc(stat.pointer.x, stat.pointer.y, 20, 0, 2 * Math.PI);
		ctx.fillStyle = "white";
		if(stat.pointer.pressed) {
			ctx.fillStyle = "lightcoral";
		}
		ctx.fill();
		ctx.restore()
	})

</script>

<canvas width={stat.viewport.width} height={stat.viewport.height} onpointermove={fns.moveTo} onpointerdown={fns.press} onpointerup={fns.release} bind:this={canvas}></canvas>

<style>
	canvas {
		height: auto;
		background: lightblue;
		display: block;
	}
</style>