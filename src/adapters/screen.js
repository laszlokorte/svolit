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

export function screenAdapter(useStoreContext) {
	return useStoreContext(selector, dispatcher, queries)
}

export const selector = (s) => ({
	pointer: s.surface.pointer.position,
	pressed: s.surface.pointer.pressed,
	viewport: s.surface.viewport,
	svgViewBox: svgViewBoxSelector(s.surface),
	viewBoxRect: svgViewBoxRectSelector(s.surface),
	originSvgViewBox: originSvgViewBoxSelector(s.surface),
	originViewBoxRect: originSvgViewBoxRectSelector(s.surface),
	camTransform: transformSelector(s.surface),
	camTransformInverse: transformInverseSelector(s.surface),
	svgAspectRatio: svgAspectRatioSelector(s.surface),
	scaling: viewBoxScaleSelector(s.surface),
})

function eventToWorld(store, evt) {
	return cameraToWorld(store.getState().surface, relativeToCamera(store.getState().surface, eventToRelative(evt)))
}

export const dispatcher = (d, store) => ({
	moveTo: (evt) => d(moveTo(relativeToCamera(store.getState().surface, eventToRelative(evt)))),
	press: (evt) => d(press()),
	release: (evt) => d(release()),    	
	resize: (width, height) => d(setSize({width, height})),
	zoomIn: () => d(zoomIn({pivot: eventToWorld(store, evt)})),
	zoomOut: () => d(zoomOut({pivot: eventToWorld(store, evt)})),
	zoomWheel: (evt) => d(zoomBy({delta: evt.wheelDelta, pivot: eventToWorld(store, evt)})),
	panStart: (evt) => {
		evt.target.setPointerCapture(evt.pointer)
		d(panStart(eventToWorld(store, evt)))
	},
	panStop: (evt) => d(panStop()),
	panMove: (evt) => {
		d(moveTo(relativeToCamera(store.getState().surface, eventToRelative(evt))))
		if(store.getState().surface.camera.pan.active) {
			d(panMove(eventToWorld(store, evt)))
		}
	},
})

function queries(sel) {
	return {
		doCamWorldTransform(ctx) {
			ctx.transform(
			  sel.state.camTransform.scaleX, 0,
			  0, sel.state.camTransform.scaleY,
			  0,
			  0
			)

			ctx.transform(
			  1, 0,
			  0, 1,
			  sel.state.camTransform.translateX,
			  sel.state.camTransform.translateY
			)
		},

		doCamWorldTransformPosition(ctx) {
			ctx.transform(
			  1, 0,
			  0, 1,
			  sel.state.camTransform.scaleX*sel.state.camTransform.translateX,
			  sel.state.camTransform.scaleY*sel.state.camTransform.translateY
			)
		},
		worldX(x, y) {
			return sel.state.camTransform.scaleX * (x + sel.state.camTransform.translateX)
		},
		worldY(x, y) {
			return sel.state.camTransform.scaleY * (y + sel.state.camTransform.translateY)
		},
		worldScaleX(s) {
			return sel.state.camTransform.scaleX * s
		},
		worldScaleY(s) {
			return sel.state.camTransform.scaleY * s
		},
		worldXY(x, y) {
			return [
			  sel.state.camTransform.scaleX * (x + sel.state.camTransform.translateX),
			  sel.state.camTransform.scaleY * (y + sel.state.camTransform.translateY)
			]
		},

	}
}