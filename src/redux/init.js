import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter'
import pointerReducer from './features/pointer'

export default function() {
	return configureStore({
	  reducer: {
	  	counter: counterReducer,
	  	pointer: pointerReducer,
	  },
	})
}