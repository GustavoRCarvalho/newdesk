import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  card: {
    title: "",
    categoryTitle: "",
    categoryLinkTitle: "",
    options: [],
    x: 0,
    y: 0,
    isArticle: true,
  },
}

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    changeCard: (state, action) => {
      state.card = action.payload
    },
    resetCard: (state) => {
      state.card = initialState.card
    },
  },
})

export const { changeCard, resetCard } = cardSlice.actions

export default cardSlice.reducer
