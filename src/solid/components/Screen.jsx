import { useStoreContext } from '../context'
import { screenAdapter } from '$adapters/screen';

import styles from './Screen.module.css'

export default function Screen({}) {
  let [state, fns] = screenAdapter(useStoreContext)

  return (
    <svg width={state().viewport.width} height={state().viewport.height}  on:pointermove={fns.moveTo} onpointerdown={fns.press} onpointerup={fns.release} class={styles.screen} viewBox={state().svgViewBox} preserveAspectRatio={state().svgAspectRatio}>
      <rect fill="pink" {...state().viewBoxRect} />
      <circle cx={state().pointer.x} cy={state().pointer.y} r="20" classList={{[styles.pointer]: true, [styles.pressed]: state().pressed}}></circle>
      <circle cx={0} cy={0} r="5" fill="black"></circle>
      <rect vector-effect="non-scaling-stroke" fill="none" stroke="purple" x={state().scaling.minX+10} y={state().scaling.minY+10} width={state().scaling.width-20} height={state().scaling.height-20} />
    </svg>
  );
}
