import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  environment: {},
  favorites: null,
  comments: undefined,
}

export const homeDataSlice = createSlice({
  name: "homeData",
  initialState,
  reducers: {
    resetData: (state) => {
      state.environment = {}
      state.favorites = null
      state.comments = undefined
    },
    setInitial: (state, action) => {
      const content = {
        ...action.payload,
        categoriesSearched: action.payload.categories,
      }

      state.environment = content
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload
    },
    addFavorite: (state, action) => {
      if (state.favorites.includes(action.payload)) {
        return
      }
      state.favorites.push(action.payload)
    },
    removeFavorite: (state, action) => {
      if (state.favorites.length === 1) {
        state.favorites = []
        return
      }
      const newFavorites = state.favorites.filter(
        (favoriteId) => favoriteId !== action.payload
      )
      state.favorites = newFavorites
    },
    setComments: (state, action) => {
      state.comments = action.payload
    },
    searchData: (state, action) => {
      state.environment.categoriesSearched = action.payload
    },
  },
})

export const {
  resetData,
  setComments,
  setInitial,
  searchData,
  addFavorite,
  removeFavorite,
  setFavorites,
} = homeDataSlice.actions

export default homeDataSlice.reducer
