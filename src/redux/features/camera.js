import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  screenSize: {
    width: 500,
    height: 500,
  },
  focus: {
    x: 0,
    y: 0,
    z: 0 // zoom Exponent
  }
}

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
  },
  selectors: {
    svgViewBox(s) {
      return `${-s.screenSize.width/2} ${-s.screenSize.height/2} ${s.screenSize.width} ${s.screenSize.height}`
    },
  }
})


export const { } = cameraSlice.actions

export const { svgViewBox: svgViewBoxSelector } = cameraSlice.selectors

export default cameraSlice.reducer