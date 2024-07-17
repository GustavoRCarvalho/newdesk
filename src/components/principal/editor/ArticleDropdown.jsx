import { useDispatch, useSelector } from "react-redux"
import { DropdownSelector } from "./DropdownSelector"
import { setEditor, selectArticleIndex } from "../../../store/editorSlice"
import { currentDate, generateUniqueId } from "../../../utils/functions"
import {
  createAlertSucess,
  createAlertWarning,
} from "../../../store/alertSlice"

export const ArticleDropdown = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.environment
  let newCopy = JSON.parse(JSON.stringify(editorData.categories))

  const articlesOptions =
    editorData.categories[editorState.selectedCategoryIndex]?.subCategories[
      editorState.selectedSubCategoryIndex
    ]?.articles ?? []
  const articles = articlesOptions.map(({ title }) => title)

  const handleChangeCategory = (newName, oldName) => {
    if (newName === oldName) return
    const articleIndex = articles.indexOf(oldName)
    if (articleIndex === -1 || articles.includes(newName)) {
      dispatch(createAlertWarning("Atenção: Este artigo já existe."))
      return
    }
    newCopy[editorState.selectedCategoryIndex].subCategories[
      editorState.selectedSubCategoryIndex
    ].articles[articleIndex].title = newName
    dispatch(setEditor(newCopy))
    dispatch(createAlertSucess("Alterado com sucesso!"))
  }

  const handleAddCategory = () => {
    if (articles.includes("Novo artigo")) {
      dispatch(createAlertWarning("Atenção: Este artigo já existe."))
      return
    }

    const newArticle = {
      id: generateUniqueId(),
      date: currentDate(),
      title: "Novo artigo",
      content: "<p><br></p>",
    }
    newCopy[editorState.selectedCategoryIndex].subCategories[
      editorState.selectedSubCategoryIndex
    ].articles.push(newArticle)
    dispatch(setEditor(newCopy))
    dispatch(createAlertSucess("Artigo adicionado com sucesso!"))
  }

  const handleRemoveCategory = (itemName) => {
    const articleIndex = articles.indexOf(itemName)

    newCopy[editorState.selectedCategoryIndex].subCategories[
      editorState.selectedSubCategoryIndex
    ].articles.splice(articleIndex, 1)

    dispatch(setEditor(newCopy))
    dispatch(createAlertSucess("Artigo removido com sucesso!"))
    if (articleIndex === editorState.selectedArticle) {
      dispatch(selectArticleIndex(-1))
    }
  }

  const handleSelectCategory = (itemName) => {
    dispatch(selectArticleIndex(itemName))
  }

  const selected = () => {
    const objDefault = {
      title: "Artigo",
    }
    const obj = articlesOptions[editorState.selectedArticleIndex]
    if (obj) {
      return obj
    }
    return objDefault
  }

  return (
    <DropdownSelector
      options={articlesOptions}
      disabled={editorState.selectedSubCategoryIndex === -1}
      placeholder={selected()}
      onSelect={handleSelectCategory}
      handleChange={handleChangeCategory}
      handleAdd={handleAddCategory}
      handleRemove={handleRemoveCategory}
    />
  )
}
