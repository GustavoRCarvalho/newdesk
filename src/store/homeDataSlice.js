import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

export const homeDataSlice = createSlice({
  name: "homeData",
  initialState,
  reducers: {
    resetData: (state) => {
      state = initialState
    },
    changeData: (state, action) => {
      state.data = action.payload
      state.oriData = action.payload
    },
    searchData: (state, action) => {
      state.data = action.payload
    },
  },
})

export const { changeData, searchData } = homeDataSlice.actions

export default homeDataSlice.reducer
