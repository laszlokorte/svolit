import { moveTo, press, release } from '$redux/features/pointer'
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
  }))

  let canvas
  let [currentSize, setSize] = createSignal({width: 0, height: 0})
  let [currentCtx, setCtx] = createSignal()


  onMount(() => {
    const updateContext = (event) => {
      setCtx(canvas.getContext('2d'))
      setSize({width: canvas.width, height: canvas.height})
    }

    updateContext()
    addEventListener("contextrestored", updateContext);

    onCleanup(() => {
      removeEventListener("contextrestored", updateContext);
    })

    createEffect(() => {
      const ctx = currentCtx()
      const size = currentSize()
      if(!ctx) {
        return
      }
      ctx.clearRect(0, 0, size.width, size.height)
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