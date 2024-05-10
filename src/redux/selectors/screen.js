import {scaleViewBox} from '$utils/viewbox'

export function viewBoxScaleSelector(s) {
	const width = s.viewport.width
	const height = s.viewport.height
	const alignX = s.viewport.alignX
	const alignY = s.viewport.alignY
	const fit = s.viewport.fit


	return scaleViewBox({
		minX: -s.camera.screenSize.width/2, 
		minY: -s.camera.screenSize.height/2, 
		width: s.camera.screenSize.width, 
		height: s.camera.screenSize.height, 
		scaling: fit, 
		alignX, 
		alignY,
	}, width, height)
}