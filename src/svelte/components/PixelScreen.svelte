<script>
	import { onMount } from 'svelte'
	import { useStoreContext } from '../context.svelte.js';
	import { screenAdapter } from '$adapters/screen';
	import { worldAdapter } from '$adapters/world';

	
  	let [stat, fns, q] = screenAdapter(useStoreContext)
  	let [world, _] = worldAdapter(useStoreContext)

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
		ctx.rect(stat.originViewBoxRect.x, stat.originViewBoxRect.y, stat.originViewBoxRect.width, stat.originViewBoxRect.height);
		ctx.closePath();
		ctx.fill()


		ctx.beginPath();
		ctx.save()
		q.doCamWorldTransformPosition(ctx);
		ctx.arc(0, 0, 5, 0, 2 * Math.PI);
		ctx.restore();
		ctx.fillStyle = "black";
		ctx.fill();




		ctx.save()
		ctx.beginPath();
		q.doCamWorldTransform(ctx);
		ctx.rect(world.bounds.minX, world.bounds.minY,
			world.bounds.maxX - world.bounds.minX,
			world.bounds.maxY - world.bounds.minY);
		ctx.restore();
		ctx.fillStyle = "#eee";
		ctx.fill();

      	ctx.fillStyle = "green";
		for(let poly of world.visiblePolygons) {
			ctx.beginPath();
			for(let {x,y} of poly.vertices) {
				ctx.lineTo(x,y)
			}
			ctx.closePath();
			ctx.fill()
		}


		ctx.beginPath();
		ctx.fillStyle = "rebeccapurple";
		if(stat.pressed) {
			ctx.fillStyle = "lightcoral";
		}
		ctx.arc(stat.pointer.x, stat.pointer.y, 20, 0, 2 * Math.PI);
		ctx.fill();

		ctx.beginPath();
		ctx.rect(stat.scaling.minX+10, stat.scaling.minY+10, stat.scaling.width-20, stat.scaling.height-20);
		ctx.closePath();

		ctx.restore()
		ctx.strokeStyle = "purple";
		ctx.lineWidth = 2;
		ctx.stroke()



	})

</script>

<canvas onwheel={fns.zoomWheel} class="screen" width={stat.viewport.width} height={stat.viewport.height} onpointermove={fns.panMove} onpointerdown={fns.panStart} onpointerup={fns.panStop}  bind:this={canvas}></canvas>

<style>
	.screen {
		height: 100%;
		width: 100%;
		background: lightblue;
		display: block;
	}
</style>