import { createSlice } from "@reduxjs/toolkit"

const initialState = { data: [] }

export const homeDataSlice = createSlice({
  name: "homeData",
  initialState,
  reducers: {
    changeData: (state, action) => {
      state.data = action.payload
    },
  },
})

export const { changeData } = homeDataSlice.actions

export default homeDataSlice.reducer
