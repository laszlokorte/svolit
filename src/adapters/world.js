import { moveTo, press, release } from '$redux/features/pointer'
import { svgAspectRatioSelector, setSize } from '$redux/features/viewport'
import { svgViewBoxSelector, svgViewBoxRectSelector, 
originSvgViewBoxSelector, originSvgViewBoxRectSelector, 
zoomIn, zoomOut, zoomBy,
panStart, panStop, panMove,
transformInverseSelector, transformSelector

} from '$redux/features/camera'
import { relativeToCamera, cameraToWorld } from '$redux/features/surface'
import { viewBoxScaleSelector } from '$redux/selectors/screen'
import { eventToRelative } from '$utils/relative';

export function worldAdapter(useStoreContext) {
	return useStoreContext(selector, dispatcher)
}

export const selector = (s) => {
	const camTransform = transformSelector(s.surface)

	return {
		visiblePolygons: s.world.polygons.map(({vertices}) => ({
			vertices: vertices.map(({x,y}) => ({
				x: (x + camTransform.translateX)*camTransform.scaleX,
				y: (y + camTransform.translateY)*camTransform.scaleY,
			})),
		}))
	}
}

export const dispatcher = (d, store) => ({
})