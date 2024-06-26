import { configureStore, combineReducers, createReducer } from '@reduxjs/toolkit'
import reduceReducers from 'reduce-reducers'
import counterReducer from './features/counter'
import worldReducer from './features/world'
import pointerReducer from './features/pointer'
import viewportReducer from './features/viewport'
import cameraReducer from './features/camera'
import { surfaceReducer, pointerClamper } from './features/surface'

export default function() {
	return configureStore({
		reducer: combineReducers({
			counter: counterReducer,
			world: worldReducer,
			surface: reduceReducers(surfaceReducer, pointerClamper)
		}),
	})
}