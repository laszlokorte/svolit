import { moveTo, press, release } from '$redux/features/pointer'
import { useStoreContext } from '../context'
import {eventToViewbox} from '$utils/svg';

import styles from './Screen.module.css'

export default function Screen({}) {
  let [state, fns] = useStoreContext((s) => ({
    pointer: s.pointer,
  }), (d) => ({
    moveTo: (evt) => d(moveTo(eventToViewbox(evt))),
    press: (evt) => d(press()),
    release: (evt) => d(release()),
  }))

  return (
    <svg on:pointermove={fns.moveTo} onpointerdown={fns.press} onpointerup={fns.release} class={styles.screen} viewBox="-500 -500 1000 1000">
      <circle cx={state().pointer.x} cy={state().pointer.y} r="20" fill="red" classList={{[styles.pressed]: state().pointer.pressed}}></circle>
    </svg>
  );
}
