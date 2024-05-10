import { moveTo, press, release } from '$redux/features/pointer'
import { svgAspectRatioSelector, setSize } from '$redux/features/viewport'
import { svgViewBoxSelector, svgViewBoxRectSelector } from '$redux/features/camera'
import { viewBoxScaleSelector } from '$redux/selectors/screen'
import { eventToRealtive } from '$utils/relative';

export function screenAdapter(useStoreContext) {
	return useStoreContext(selector, dispatcher(eventToRealtive))
}

export const selector = (s) => ({
	pointer: s.surface.pointer.position,
	pressed: s.surface.pointer.pressed,
	viewport: s.surface.viewport,
	svgViewBox: svgViewBoxSelector(s.surface),
	viewBoxRect: svgViewBoxRectSelector(s.surface),
	svgAspectRatio: svgAspectRatioSelector(s.surface),
	scaling: viewBoxScaleSelector(s.surface),
})

export const dispatcher = (eventToViewbox) => (d) => ({
	moveTo: (evt) => d(moveTo(eventToViewbox(evt))),
	press: (evt) => d(press()),
	release: (evt) => d(release()),    	
	resize: (width, height) => d(setSize({width, height})),
})