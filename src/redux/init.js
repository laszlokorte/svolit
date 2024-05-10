import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter'
import pointerReducer from './features/pointer'
import viewportReducer from './features/viewport'
import cameraReducer from './features/camera'



export default function() {
	return configureStore({
	  reducer: {
	  	counter: counterReducer,
	  	pointer: pointerReducer,
	  	viewport: viewportReducer,
	  	camera: cameraReducer,
	  },
	})
}
