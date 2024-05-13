import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  position: {
    x: 0,
    y: 0,
  },
  pressed: false,
}

export const pointerSlice = createSlice({
  name: 'pointer',
  initialState,
  reducers: {
    moveTo: (state, {payload: {x, y}}) => {
      state.position.x = x
      state.position.y = y
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

export const { } = pointerSlice.selectors

export default pointerSlice.reducer