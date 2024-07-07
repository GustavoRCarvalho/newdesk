import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  editor: [],
  selectedCategory: "",
  selectedSubCategory: "",
  selectedArticle: "",
}

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    initialData: (state) => {
      state = { ...initialState }
    },
    setEditor: (state, action) => {
      state.editor = action.payload
    },
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    selectSubCategory: (state, action) => {
      state.selectedSubCategory = action.payload
    },
    selectArticle: (state, action) => {
      state.selectedArticle = action.payload
    },
  },
})

export const {
  initialData,
  setEditor,
  selectCategory,
  selectSubCategory,
  selectArticle,
} = editorSlice.actions

export default editorSlice.reducer
