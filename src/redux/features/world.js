import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  polygons: [
    {vertices: [{x:100,y:0}, {x:-200,y:100},{x:-100,y:-50}]},
    {vertices: [{x:500+300,y:0}, {x:300,y:400},{x:500,y:-50}]},
  ]
}

export const worldSlice = createSlice({
  name: 'world',
  initialState,
  reducers: {
  },
})


export const { } = worldSlice.actions

export const { } = worldSlice.selectors

export default worldSlice.reducer