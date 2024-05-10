import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  screenSize: {
    width: 800,
    height: 1600,
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
    svgViewBoxRect(s) {
      return {
        x: -s.screenSize.width/2,
        y: -s.screenSize.height/2,
        width: s.screenSize.width,
        height: s.screenSize.height,
      }
    },
  }
})


export const { } = cameraSlice.actions

export const { svgViewBox: svgViewBoxSelector, svgViewBoxRect: svgViewBoxRectSelector } = cameraSlice.selectors

export default cameraSlice.reducer