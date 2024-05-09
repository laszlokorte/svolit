import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  width: 600,
  height: 400,
  alignX: 'mid',
  alignY: 'mid',
  fit: 'meet',
}

export const viewportSlice = createSlice({
  name: 'viewport',
  initialState,
  reducers: {
  },
  selectors: {
    svgAspectRatio(s) {
      return s.fit ? `x${s.alignX}Y${s.alignY} ${s.fit}` : 'none'
    },
  }
})


export const { } = viewportSlice.actions

export const { svgAspectRatio: svgAspectRatioSelector } = viewportSlice.selectors

export default viewportSlice.reducer