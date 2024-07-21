import { createSlice } from "@reduxjs/toolkit"
import { currentDate, generateUniqueId } from "../utils/functions"

const initialState = {
  environment: { categories: [] },

  selectedCategoryIndex: -1,
  selectedSubCategoryIndex: -1,
  selectedArticleIndex: -1,
}

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    initialData: (state) => {
      state.environment = { categories: [] }
      state.selectedCategoryIndex = -1
      state.selectedSubCategoryIndex = -1
      state.selectedArticleIndex = -1
    },
    setEditorInitial: (state, action) => {
      state.environment = action.payload
    },
    changeContentArticle: (state, action) => {
      const content = action.payload

      state.environment.categories[state.selectedCategoryIndex].subCategories[
        state.selectedSubCategoryIndex
      ].articles[state.selectedArticleIndex].content = content

      state.environment.categories[state.selectedCategoryIndex].subCategories[
        state.selectedSubCategoryIndex
      ].articles[state.selectedArticleIndex].date = currentDate()
    },
    addCategory: (state) => {
      const newCategory = {
        title: "Nova categoria",
        Icon: "",
        subCategories: [],
      }
      state.environment.categories.push(newCategory)
    },
    addSubCategory: (state) => {
      const newSubCategory = {
        title: "Nova sub categoria",
        articles: [],
      }
      state.environment.categories[
        state.selectedCategoryIndex
      ].subCategories.push(newSubCategory)
    },
    addArticle: (state) => {
      const newArticle = {
        id: generateUniqueId(),
        date: currentDate(),
        title: "Novo artigo",
        content: "<p><br></p>",
        backgroundColor: "var(--home-card-background)",
      }
      state.environment.categories[state.selectedCategoryIndex].subCategories[
        state.selectedSubCategoryIndex
      ].articles.push(newArticle)
    },
    removeCategory: (state, action) => {
      const index = action.payload.index

      state.environment.categories.splice(index, 1)
      if (index === state.selectedCategoryIndex) {
        state.selectedCategoryIndex = -1
        state.selectedSubCategoryIndex = -1
        state.selectedArticleIndex = -1
      }
    },
    removeSubCategory: (state, action) => {
      const index = action.payload.index

      state.environment.categories[
        state.selectedCategoryIndex
      ].subCategories.splice(index, 1)
      if (index === state.selectedSubCategoryIndex) {
        state.selectedSubCategoryIndex = -1
        state.selectedArticleIndex = -1
      }
    },
    removeArticle: (state, action) => {
      const index = action.payload.index

      state.environment.categories[state.selectedCategoryIndex].subCategories[
        state.selectedSubCategoryIndex
      ].articles.splice(index, 1)
      if (index === state.selectedArticleIndex) {
        state.selectedArticleIndex = -1
      }
    },
    changeNameCategory: (state, action) => {
      const newName = action.payload.newName
      const index = action.payload.index

      state.environment.categories[index].title = newName
    },
    changeNameSubCategory: (state, action) => {
      const newName = action.payload.newName
      const index = action.payload.index

      state.environment.categories[state.selectedCategoryIndex].subCategories[
        index
      ].title = newName
    },
    changeNameArticle: (state, action) => {
      const newName = action.payload.newName
      const index = action.payload.index

      state.environment.categories[state.selectedCategoryIndex].subCategories[
        state.selectedSubCategoryIndex
      ].articles[index].title = newName
    },
    changeBackgroundArticle: (state, action) => {
      const newColor = action.payload.newColor

      state.environment.categories[state.selectedCategoryIndex].subCategories[
        state.selectedSubCategoryIndex
      ].articles[state.selectedArticleIndex].backgroundColor = newColor
    },
    changeIconCategory: (state, action) => {
      const newIcon = action.payload.newIcon
      const index = action.payload.index

      state.environment.categories[index].Icon = newIcon
    },
    selectCategory: (state, action) => {
      state.selectedCategoryIndex = action.payload
      state.selectedSubCategoryIndex = -1
      state.selectedArticleIndex = -1
    },
    selectSubCategory: (state, action) => {
      state.selectedSubCategoryIndex = action.payload
      state.selectedArticleIndex = -1
    },
    selectArticle: (state, action) => {
      state.selectedArticleIndex = action.payload
    },
  },
})

export const {
  initialData,
  changeContentArticle,
  addCategory,
  addSubCategory,
  addArticle,
  removeCategory,
  removeSubCategory,
  removeArticle,
  changeNameCategory,
  changeNameSubCategory,
  changeNameArticle,
  changeBackgroundArticle,
  changeIconCategory,
  selectCategory,
  selectSubCategory,
  selectArticle,
  setEditorInitial,
} = editorSlice.actions

export default editorSlice.reducer
