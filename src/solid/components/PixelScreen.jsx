import { moveTo, press, release } from '$redux/features/pointer'
import { setSize as resize } from '$redux/features/viewport'
import { svgViewBoxRectSelector } from '$redux/features/camera'
import { viewBoxScaleSelector } from '$redux/selectors/screen'
import { createSignal, onCleanup, onMount, createEffect } from 'solid-js'
import { useStoreContext } from '../context'
import {eventToViewbox} from '$utils/canvas';

import styles from './PixelScreen.module.css'

export default function Screen({}) {
  let [state, fns] = useStoreContext((s) => ({
    pointer: s.pointer,
    viewport: s.viewport,
    viewBoxRect: svgViewBoxRectSelector(s),
    scaling: viewBoxScaleSelector(s),
  }), (d) => ({
    moveTo: (evt) => d(moveTo(eventToViewbox(evt))),
    press: (evt) => d(press()),
    release: (evt) => d(release()),
    resize: (width, height) => d(resize({width, height})),
  }))

  let canvas
  let [currentCtx, setCtx] = createSignal()


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
      ctx.rect(stat.viewBoxRect.x, stat.viewBoxRect.y, stat.viewBoxRect.width, stat.viewBoxRect.height);
      ctx.closePath();
      ctx.fill()

      ctx.beginPath();
      ctx.arc(stat.pointer.x, stat.pointer.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      if(stat.pointer.pressed) {
        ctx.fillStyle = "lightcoral";
      }
      ctx.closePath();
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

    })
  })
  

  return (
    <canvas width={state().viewport.width} height={state().viewport.height} onpointermove={fns.moveTo} onpointerdown={fns.press} onpointerup={fns.release} ref={canvas}class={styles.screen}></canvas>
  );
}
