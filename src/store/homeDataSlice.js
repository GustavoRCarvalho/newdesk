import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  environment: {},
}

export const homeDataSlice = createSlice({
  name: "homeData",
  initialState,
  reducers: {
    resetData: (state) => {
      state.environment = initialState.environment
    },
    setInitial: (state, action) => {
      state.environment = action.payload
      state.environment.categoriesSearched = action.payload.categories
    },
    setComments: (state, action) => {
      state.environment.comments = action.payload
    },
    changeData: (state, action) => {
      state.environment.categoriesSearched = action.payload
      state.environment.categories = action.payload
    },
    searchData: (state, action) => {
      state.environment.categoriesSearched = action.payload
    },
  },
})

export const { setComments, setInitial, changeData, searchData } =
  homeDataSlice.actions

export default homeDataSlice.reducer
