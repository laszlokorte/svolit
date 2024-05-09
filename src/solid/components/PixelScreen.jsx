import { moveTo, press, release } from '$redux/features/pointer'
import { setSize as resize } from '$redux/features/viewport'
import { createSignal, onCleanup, onMount, createEffect } from 'solid-js'
import { useStoreContext } from '../context'
import {eventToViewbox} from '$utils/canvas';

import styles from './PixelScreen.module.css'

export default function Screen({}) {
  let [state, fns] = useStoreContext((s) => ({
    pointer: s.pointer,
    viewport: s.viewport,
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
      ctx.clearRect(0, 0, state().viewport.width, state().viewport.height)
      ctx.save()
      ctx.translate(state().viewport.width/2, state().viewport.height/2)
      ctx.beginPath();
      ctx.arc(state().pointer.x, state().pointer.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      if(state().pointer.pressed) {
        ctx.fillStyle = "lightcoral";
      }
      ctx.fill();
      ctx.restore()
    })
  })
  

  return (
    <canvas width={state().viewport.width} height={state().viewport.height} onpointermove={fns.moveTo} onpointerdown={fns.press} onpointerup={fns.release} ref={canvas}class={styles.screen}></canvas>
  );
}
