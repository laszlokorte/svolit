import { useStoreContext } from '../context'
import { screenAdapter } from '$adapters/screen';
import { worldAdapter } from '$adapters/world';

import styles from './Screen.module.css'

export default function Screen({}) {
  let [state, fns] = screenAdapter(useStoreContext)
  let [world, _] = worldAdapter(useStoreContext)
  
  function worldX(x, y) {
    return state().camTransform.scaleX * (x + state().camTransform.translateX)
  }

  function worldY(x, y) {
    return state().camTransform.scaleY * (y + state().camTransform.translateY)
  }

  function worldScaleX(s) {
    return state().camTransform.scaleX * s
  }

  function worldScaleY(s) {
    return state().camTransform.scaleY * s
  }

  function worldXY(x, y) {
    return [
      state().camTransform.scaleX * (x + state().camTransform.translateX),
      state().camTransform.scaleY * (y + state().camTransform.translateY)
    ]
  }

  return (
    <svg onwheel={fns.zoomWheel} width={state().viewport.width} height={state().viewport.height}  
    onpointermove={fns.panMove} onpointerdown={fns.panStart} onpointerup={fns.panStop} 
    class={styles.screen} viewBox={state().originSvgViewBox} preserveAspectRatio={state().svgAspectRatio}>
      <rect fill="pink" {...state().originViewBoxRect} />
      <circle cx={worldX(0,0)} cy={worldY(0,0)} r="5" fill="black"></circle>
      <rect stroke-width="2" vector-effect="non-scaling-stroke" fill="none" stroke="purple" x={state().scaling.minX+10} y={state().scaling.minY+10} width={state().scaling.width-20} height={state().scaling.height-20} />


      <rect 
      x={worldX(world().bounds.minX, world().bounds.minY)} 
      y={worldY(world().bounds.minX, world().bounds.minY)} 
      width={worldScaleX(world().bounds.maxX - world().bounds.minX)} 
      height={worldScaleY(world().bounds.maxY - world().bounds.minY)} 
      fill="#eee" />

      <For each={world().visiblePolygons}>
        {(poly) => <polygon points={poly.vertices.map(({x,y}) => `${x}, ${y}`).join(',')} fill="green" />}

      </For>
      <circle cx={state().pointer.x} cy={state().pointer.y} r="20" classList={{[styles.pointer]: true, [styles.pressed]: state().pressed}}></circle>
    </svg>
  );
}
