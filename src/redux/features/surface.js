import { combineReducers, createReducer } from '@reduxjs/toolkit'
import { produce } from "immer"

import pointerReducer from './pointer'
import viewportReducer from './viewport'
import cameraReducer from './camera'
import { scaleViewBox } from '$utils/viewbox'

function visibleRange(s) {
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

function interceptAction(guard, modifier) {
	return function (reducer) {
		return function wrapped(state, action) {
			if(guard(state, action)) {
				const newAction = produce(action, draft => modifier(state, draft))
				return reducer(state, newAction)
			} else {
				return reducer(state, action)
			}
		}
	}
}

export function relativeToCamera(state, relative) {
	const vis = visibleRange(state)
	
	return {
		x: vis.minX + vis.width * relative.relativeX,
		y: vis.minY + vis.height * relative.relativeY,
	}
}


export function cameraToWorld(state, camPos) {
	const cam = state.camera
	const zoomFactor = Math.exp(cam.focus.z)

	return {
		worldX: (camPos.x/zoomFactor + cam.focus.x),
		worldY: (camPos.y/zoomFactor + cam.focus.y),
	}
}


// const interceptSurfacePosition = interceptAction(
// 	(state, action) => action.payload && (action.payload.relativeX || action.payload.relativeY), 
// 	(state, action) => {
// 		const cam = relativeToCamera(state, action.payload)
// 		action.payload.x = cam.x;
// 		action.payload.y = cam.y;
// 	}
// )

// const interceptWorldPosition = interceptAction(
// 	(state, action) => action.payload && (action.payload.x || action.payload.y), 
// 	(state, action) => {
// 		const cam = relativeToCamera(state, action.payload)
// 		const vis = visibleRange(state)
// 		action.payload.worldX = action.payload.x;
// 		action.payload.worldY = action.payload.y;
// 	}
// )

export const surfaceReducer = combineReducers({
	pointer: pointerReducer,
	viewport: viewportReducer,
	camera: cameraReducer,
})

export const pointerClamper = createReducer(surfaceReducer.initalState, (builder) => {
	builder
    .addDefaultCase((s) => {
    	const margin = 50
    	const vis = visibleRange(s)
    	s.pointer.position.x = clamp(vis.minX + margin, vis.minX + vis.width - margin, s.pointer.position.x)
    	s.pointer.position.y = clamp(vis.minY + margin, vis.minY + vis.height - margin, s.pointer.position.y)
    })
})

function clamp(min,max,v) {
	return Math.max(min, Math.min(max, v))
}