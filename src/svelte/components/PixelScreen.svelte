<script>
	import { onMount } from 'svelte'
	import { useStoreContext } from '../context.svelte.js';
	import { eventToViewbox } from '$utils/canvas';
	import { screenAdapter } from '$adapters/screen';

	
  	let [stat, fns] = screenAdapter(useStoreContext, eventToViewbox)

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
		ctx.transform(stat.scaling.scaleX, 0, 0, stat.scaling.scaleY, stat.scaling.translateX, stat.scaling.translateY)
		
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


		ctx.beginPath();
		ctx.rect(stat.scaling.minX+10, stat.scaling.minY+10, stat.scaling.width-20, stat.scaling.height-20);
		ctx.closePath();
		ctx.restore()
		ctx.strokeStyle = "purple";
		ctx.lineWidth = 1;
		ctx.stroke()


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