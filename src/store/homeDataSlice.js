import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  environment: {},
  comments: undefined,
}

export const homeDataSlice = createSlice({
  name: "homeData",
  initialState,
  reducers: {
    resetData: (state) => {
      state.environment = initialState.environment
      state.environment = initialState.comments
    },
    setInitial: (state, action) => {
      state.environment = action.payload
    },
    setComments: (state, action) => {
      state.comments = action.payload
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
