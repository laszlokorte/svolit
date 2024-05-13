import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  screenSize: {
    width: 800,
    height: 1600,
  },
  focus: {
    x: 0,
    y: 0,
    z: 0, // zoom Exponent
  },
  pan: {
    active: false,
    handle: {
      x:0,
      y:0,
    }
  },
}

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    zoomIn: (state) => {
      state.focus.z += 1
    },
    zoomOut: (state) => {
      state.focus.z -= 1
    },
    zoomBy: (state, {payload: {delta}}) => {
      state.focus.z += delta/500
    },
    zoomReset: (state) => {
      state.focus.z = 0
    },
    panStart: (state, {payload: {worldX: x, worldY: y}}) => {
      state.pan.active = true
      state.pan.handle.x = x
      state.pan.handle.y = y
    },
    panStop: (state) => {
      state.pan.active = false
    },
    panMove: (state, {payload: {worldX: x, worldY: y}}) => {
      state.focus.x -= x - state.pan.handle.x
      state.focus.y -= y - state.pan.handle.y
    },
  },
  selectors: {
    originSvgViewBox(s) {
      return `${-s.screenSize.width/2} ${-s.screenSize.height/2} ${s.screenSize.width} ${s.screenSize.height}`
    },
    originSvgViewBoxRect(s) {
      return {
        x: -s.screenSize.width/2,
        y: -s.screenSize.height/2,
        width: s.screenSize.width,
        height: s.screenSize.height,
      }
    },
    svgViewBox(s) {
      const zoomFactor = Math.exp(s.focus.z)
      return `${-s.screenSize.width/2 * zoomFactor + s.focus.x} ${-s.screenSize.height/2 * zoomFactor + s.focus.y} ${s.screenSize.width * zoomFactor} ${s.screenSize.height * zoomFactor}`
    },
    svgViewBoxRect(s) {
      const zoomFactor = Math.exp(s.focus.z);

      return {
        x: -s.screenSize.width/2 * zoomFactor + s.focus.x,
        y: -s.screenSize.height/2 * zoomFactor + s.focus.y,
        width: s.screenSize.width * zoomFactor,
        height: s.screenSize.height * zoomFactor,
      }
    },
    transform(s) {
      const zoomFactor = Math.exp(s.focus.z)
      return {
        scaleX: zoomFactor,
        scaleY: zoomFactor,
        translateX: -s.focus.x,
        translateY: -s.focus.y,
      }
    },
    transformInverse(s) {
      const zoomFactor = Math.exp(s.focus.z)
      return {
        scaleX: 1/zoomFactor,
        scaleY: 1/zoomFactor,
        translateX: s.focus.x,
        translateY: s.focus.y,
      }
    },
  }
})


export const {
  zoomIn,
  zoomOut,
  zoomBy,
  zoomReset,
  panStart,
  panStop,
  panMove,
} = cameraSlice.actions

export const { 
  originSvgViewBox: originSvgViewBoxSelector, 
  originSvgViewBoxRect: originSvgViewBoxRectSelector,
  svgViewBox: svgViewBoxSelector, 
  svgViewBoxRect: svgViewBoxRectSelector,
  transform: transformSelector,
  transformInverse: transformInverseSelector,
} = cameraSlice.selectors

export default cameraSlice.reducer