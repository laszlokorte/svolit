import { createSignal, onCleanup, onMount, createEffect } from 'solid-js'
import { useStoreContext } from '../context'
import { screenAdapter } from '$adapters/screen';
import { worldAdapter } from '$adapters/world';


import styles from './PixelScreen.module.css'

export default function Screen({}) {
  
  let [state, fns] = screenAdapter(useStoreContext)
  let [world, _] = worldAdapter(useStoreContext)

  let canvas
  let [currentCtx, setCtx] = createSignal()

  function doCamWorldTransform(ctx) {
    ctx.transform(
      state().camTransform.scaleX, 0,
      0, state().camTransform.scaleY,
      0,
      0
    )

    ctx.transform(
      1, 0,
      0, 1,
      state().camTransform.translateX,
      state().camTransform.translateY
    )
  }

  function doCamWorldTransformPosition(ctx) {
    ctx.transform(
      1, 0,
      0, 1,
      state().camTransform.scaleX*state().camTransform.translateX,
      state().camTransform.scaleY*state().camTransform.translateY
    )
  }


  onMount(() => {
    const updateContext = (event) => {
      setCtx(canvas.getContext('2d'))
    }
    const updateRealSize = (event) => {
      fns.resize(canvas.offsetWidth, canvas.offsetHeight)
    }

    updateContext()
    updateRealSize()
    canvas.addEventListener("contextrestored", updateContext);
    window.addEventListener("resize", updateRealSize);

    onCleanup(() => {
      canvas.removeEventListener("contextrestored", updateContext);
      window.removeEventListener("resize", updateRealSize);
    })

    createEffect(() => {
      const ctx = currentCtx()
      if(!ctx) {
        return
      }
      const stat = state()
      ctx.clearRect(0, 0, state().viewport.width, state().viewport.height)
      ctx.save()    
      ctx.transform(stat.scaling.scaleX, 0, 0, stat.scaling.scaleY, stat.scaling.translateX, stat.scaling.translateY)


      ctx.beginPath();
      ctx.fillStyle = "lightpink";
      ctx.rect(stat.originViewBoxRect.x, stat.originViewBoxRect.y, stat.originViewBoxRect.width, stat.originViewBoxRect.height);
      ctx.closePath();
      ctx.fill()

      ctx.beginPath();
      ctx.arc(stat.pointer.x, stat.pointer.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      if(stat.pressed) {
        ctx.fillStyle = "lightcoral";
      }
      ctx.closePath();
      ctx.fill();


      ctx.beginPath();
      ctx.save()
      doCamWorldTransformPosition(ctx);
      ctx.arc(0, 0, 5, 0, 2 * Math.PI);
      ctx.restore();
      ctx.fillStyle = "black";
      ctx.fill();



      ctx.fillStyle = "green";
      for(let poly of world().visiblePolygons) {
        ctx.beginPath();
        for(let {x,y} of poly.vertices) {
          ctx.lineTo(x,y)
        }
        ctx.closePath();
        ctx.fill()
      }


      ctx.beginPath();
      ctx.rect(stat.scaling.minX+10, stat.scaling.minY+10, stat.scaling.width-20, stat.scaling.height-20);
      ctx.closePath();
      ctx.restore()

      ctx.strokeStyle = "purple";
      ctx.lineWidth = 2;
      ctx.stroke()

    })
  })
  

  return (
    <canvas onwheel={fns.zoomWheel} 
    width={state().viewport.width} height={state().viewport.height} 
    onpointermove={fns.panMove} onpointerdown={fns.panStart} onpointerup={fns.panStop} 
    ref={canvas}class={styles.screen}></canvas>
  );
}
