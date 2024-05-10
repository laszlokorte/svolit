import { configureStore, combineReducers } from '@reduxjs/toolkit'
import reduceReducers from 'reduce-reducers'
import counterReducer from './features/counter'
import pointerReducer from './features/pointer'
import viewportReducer from './features/viewport'
import cameraReducer from './features/camera'


const surfaceReducer = combineReducers({
	pointer: pointerReducer,
	viewport: viewportReducer,
	camera: cameraReducer,
})

export default function() {
	return configureStore({
		reducer: combineReducers({
			counter: counterReducer,
			surface: surfaceReducer
		}),
	})
}
