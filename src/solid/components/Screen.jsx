import { useStoreContext } from '../context'
import { screenAdapter } from '$adapters/screen';
import { worldAdapter } from '$adapters/world';

import styles from './Screen.module.css'

export default function Screen({}) {
  let [state, fns, q] = screenAdapter(useStoreContext)
  let [world, _] = worldAdapter(useStoreContext)
  
  return (
    <svg onwheel={fns.zoomWheel} width={state().viewport.width} height={state().viewport.height}  
    onpointermove={fns.panMove} onpointerdown={fns.panStart} onpointerup={fns.panStop} 
    class={styles.screen} viewBox={state().originSvgViewBox} preserveAspectRatio={state().svgAspectRatio}>
      <rect fill="pink" {...state().originViewBoxRect} />
      <circle cx={q.worldX(0,0)} cy={q.worldY(0,0)} r="5" fill="black"></circle>
      <rect stroke-width="2" vector-effect="non-scaling-stroke" fill="none" stroke="purple" x={state().scaling.minX+10} y={state().scaling.minY+10} width={state().scaling.width-20} height={state().scaling.height-20} />


      <rect 
      x={q.worldX(world().bounds.minX, world().bounds.minY)} 
      y={q.worldY(world().bounds.minX, world().bounds.minY)} 
      width={q.worldScaleX(world().bounds.maxX - world().bounds.minX)} 
      height={q.worldScaleY(world().bounds.maxY - world().bounds.minY)} 
      fill="#eee" />

      <For each={world().visiblePolygons}>
        {(poly) => <polygon points={poly.vertices.map(({x,y}) => `${x}, ${y}`).join(',')} fill="green" />}

      </For>
      <circle cx={state().pointer.x} cy={state().pointer.y} r="20" classList={{[styles.pointer]: true, [styles.pressed]: state().pressed}}></circle>
    </svg>
  );
}
