import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  width: 600,
  height: 400,
  alignX: 'Min',
  alignY: 'Min',
  fit: 'none',
}

export const viewportSlice = createSlice({
  name: 'viewport',
  initialState,
  reducers: {
    setSize: (s, {payload:{width, height}}) => {
      s.width = width
      s.height = height
    }
  },
  selectors: {
    svgAspectRatio(s) {
      return s.fit !== 'none' ? `x${s.alignX}Y${s.alignY} ${s.fit}` : 'none'
    },
  }
})


export const { setSize } = viewportSlice.actions

export const { svgAspectRatio: svgAspectRatioSelector } = viewportSlice.selectors

export default viewportSlice.reducer