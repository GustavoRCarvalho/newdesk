import { createSlice } from "@reduxjs/toolkit"
import { data } from "../assets/data"

const initialState = { data: data }

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
