import { moveTo, press, release } from '$redux/features/pointer'
import { svgAspectRatioSelector } from '$redux/features/viewport'
import { svgViewBoxSelector, svgViewBoxRectSelector } from '$redux/features/camera'
import { useStoreContext } from '../context'
import {eventToViewbox} from '$utils/svg';

import styles from './Screen.module.css'

export default function Screen({}) {
  let [state, fns] = useStoreContext((s) => ({
    pointer: s.pointer,
    viewport: s.viewport,
    svgViewBox: svgViewBoxSelector(s),
    viewBoxRect: svgViewBoxRectSelector(s),
    svgAspectRatio: svgAspectRatioSelector(s),
  }), (d) => ({
    moveTo: (evt) => d(moveTo(eventToViewbox(evt))),
    press: (evt) => d(press()),
    release: (evt) => d(release()),
  }))

  return (
    <svg width={state().viewport.width} height={state().viewport.height}  on:pointermove={fns.moveTo} onpointerdown={fns.press} onpointerup={fns.release} class={styles.screen} viewBox={state().svgViewBox} preserveAspectRatio={state().svgAspectRatio}>
      <rect fill="pink" {...state().viewBoxRect} />
      <circle cx={state().pointer.x} cy={state().pointer.y} r="20" classList={{[styles.pointer]: true, [styles.pressed]: state().pointer.pressed}}></circle>
      <circle cx={0} cy={0} r="5" fill="black"></circle>
    </svg>
  );
}
