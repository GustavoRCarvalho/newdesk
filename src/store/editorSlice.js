import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  editor: [],
  selectedCategoryIndex: -1,
  selectedSubCategoryIndex: -1,
  selectedArticleIndex: -1,
}

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    initialData: (state) => {
      state.editor = []
      state.selectedCategoryIndex = -1
      state.selectedSubCategoryIndex = -1
      state.selectedArticleIndex = -1
    },
    setEditor: (state, action) => {
      state.editor = action.payload
    },
    selectCategoryIndex: (state, action) => {
      state.selectedCategoryIndex = action.payload
    },
    selectSubCategoryIndex: (state, action) => {
      state.selectedSubCategoryIndex = action.payload
    },
    selectArticleIndex: (state, action) => {
      state.selectedArticleIndex = action.payload
    },
  },
})

export const {
  initialData,
  setEditor,
  selectCategoryIndex,
  selectSubCategoryIndex,
  selectArticleIndex,
} = editorSlice.actions

export default editorSlice.reducer
