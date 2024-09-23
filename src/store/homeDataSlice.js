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
      state.environment = {}
      state.comments = undefined
    },
    setInitial: (state, action) => {
      const content = {
        ...action.payload,
        categoriesSearched: action.payload.categories,
      }

      state.environment = content
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

export const { resetData, setComments, setInitial, changeData, searchData } =
  homeDataSlice.actions

export default homeDataSlice.reducer
