export function scaleViewBox({minX, minY, width, height, scaling, alignX, alignY}, targetWidth, targetHeight) {
	if(scaling === 'none') {
		return {
			minX: minX,
			minY: minY,
			width: width,
			height: height,
			factorX: targetWidth/width,
			factorY: targetHeight/height,
			offsetX: targetWidth/2,
			offsetY: targetHeight/2,
		}
	} else {
		const relWidth = width/targetWidth
		const relHeight = height/targetHeight
		
		const factor = {
			'meet': Math.max,
			'slice': Math.min
		}[scaling].call(Math, relWidth, relHeight)

		const actualWidth = targetWidth * factor
		const actualHeight = targetHeight * factor
		const extraWidth = actualWidth - width
		const extraHeight = actualHeight - height

		const alignmentWeights = {
			'Min': 0,
			'Mid': 0.5,
			'Max': 1,
		};

		
		const extraWeightingX = alignmentWeights[alignX];
		const extraWeightingY = alignmentWeights[alignY];

		return {
			minX:  minX - extraWeightingX * extraWidth,
			minY: minY - extraWeightingY * extraHeight,
			width: actualWidth,
			height: actualHeight,
			factorX: 1/factor,
			factorY: 1/factor,
			offsetX: (targetWidth - extraWidth/factor)/2 + extraWidth/factor * extraWeightingX,
			offsetY: (targetHeight - extraHeight/factor)/2 + extraHeight/factor * extraWeightingY,
		}
	}
}