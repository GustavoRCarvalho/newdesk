import { createSlice } from "@reduxjs/toolkit"
import { currentDate, generateUniqueId } from "../utils/functions"

const initialState = {
  environment: {},

  selectedCategoryIndex: -1,
  selectedSubCategoryIndex: -1,
  selectedArticleIndex: -1,
  articleChanged: false,
}

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    initialData: (state) => {
      state.environment = {}
      state.selectedCategoryIndex = -1
      state.selectedSubCategoryIndex = -1
      state.selectedArticleIndex = -1
    },
    setEditorInitial: (state, action) => {
      state.environment = action.payload
    },
    setEditorName: (state, action) => {
      state.environment.environmentName = action.payload
    },
    setEditorImage: (state, action) => {
      state.environment.environmentImage = action.payload
    },
    boolArticleChange: (state, action) => {
      state.articleChanged = action.payload
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
        linkTitle: "Nova-categoria",
        title: "Nova categoria",
        Icon: "",
        subCategories: [],
      }
      state.environment.categories.push(newCategory)
    },
    addSubCategory: (state) => {
      const newSubCategory = {
        linkTitle: "Nova-sub-categoria",
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
        linkTitle: "Novo-artigo",
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
      state.environment.categories[index].linkTitle = newName.replace(
        /([^a-zA-Z0-9])/g,
        "-"
      )
    },
    changeNameSubCategory: (state, action) => {
      const newName = action.payload.newName
      const index = action.payload.index

      state.environment.categories[state.selectedCategoryIndex].subCategories[
        index
      ].title = newName
      state.environment.categories[state.selectedCategoryIndex].subCategories[
        index
      ].linkTitle = newName.replace(/([^a-zA-Z0-9])/g, "-")
    },
    changeNameArticle: (state, action) => {
      const newName = action.payload.newName
      const index = action.payload.index

      state.environment.categories[state.selectedCategoryIndex].subCategories[
        state.selectedSubCategoryIndex
      ].articles[index].title = newName
      state.environment.categories[state.selectedCategoryIndex].subCategories[
        state.selectedSubCategoryIndex
      ].articles[index].linkTitle = newName.replace(/([^a-zA-Z0-9])/g, "-")
    },
    changeOrderCategory: (state, action) => {
      state.environment.categories = action.payload
    },
    changeOrderSubCategory: (state, action) => {
      state.environment.categories[state.selectedCategoryIndex].subCategories =
        action.payload
    },
    changeOrderArticle: (state, action) => {
      state.environment.categories[state.selectedCategoryIndex].subCategories[
        state.selectedSubCategoryIndex
      ].articles = action.payload
    },
    changeBackgroundArticle: (state, action) => {
      const newColor = action.payload.newColor

      if (
        state.environment.categories[state.selectedCategoryIndex].subCategories[
          state.selectedSubCategoryIndex
        ].articles[state.selectedArticleIndex].backgroundColor !== newColor
      ) {
        state.environment.categories[state.selectedCategoryIndex].subCategories[
          state.selectedSubCategoryIndex
        ].articles[state.selectedArticleIndex].backgroundColor = newColor
        state.articleChanged = true
      }
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
  setEditorName,
  setEditorImage,
  boolArticleChange,
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
  changeOrderCategory,
  changeOrderSubCategory,
  changeOrderArticle,
  changeBackgroundArticle,
  changeIconCategory,
  selectCategory,
  selectSubCategory,
  selectArticle,
  setEditorInitial,
} = editorSlice.actions

export default editorSlice.reducer
