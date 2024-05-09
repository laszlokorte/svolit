import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  x: 0,
  y: 0,
  pressed: false,
}

export const pointerSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    moveTo: (state, {payload: {x,y}}) => {
      state.x = x
      state.y = y
    },
    press: (state) => {
      state.pressed = true
    },
    release: (state) => {
      state.pressed = false
    },
  },
})


export const { moveTo, press, release } = pointerSlice.actions

export default pointerSlice.reducer