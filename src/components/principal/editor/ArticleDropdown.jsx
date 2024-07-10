import { useDispatch, useSelector } from "react-redux"
import { DropdownSelector } from "./DropdownSelector"
import { setEditor, selectArticleIndex } from "../../../store/editorSlice"
import { currentDate } from "../../../utils/functions"

export const ArticleDropdown = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.editor
  let newCopy = JSON.parse(JSON.stringify(editorData))

  const articles =
    editorData[editorState.selectedCategoryIndex]?.subCategories[
      editorState.selectedSubCategoryIndex
    ]?.articles.map(({ title }) => title) ?? []

  const handleChangeCategory = (newName, oldName) => {
    const articleIndex = articles.indexOf(oldName)
    if (articleIndex === -1 || articles.includes(newName)) {
      return
    }
    newCopy[editorState.selectedCategoryIndex].subCategories[
      editorState.selectedSubCategoryIndex
    ].articles[articleIndex].title = newName
    dispatch(setEditor(newCopy))
  }

  const handleAddCategory = () => {
    if (articles.includes("Novo artigo")) {
      return
    }

    const newArticle = {
      title: "Novo artigo",
      date: currentDate(),
      textURL: "text_name",
      data: "<p><br></p>",
    }
    newCopy[editorState.selectedCategoryIndex].subCategories[
      editorState.selectedSubCategoryIndex
    ].articles.push(newArticle)
    dispatch(setEditor(newCopy))
  }

  const handleRemoveCategory = (itemName) => {
    const articleIndex = articles.indexOf(itemName)

    newCopy[editorState.selectedCategoryIndex].subCategories[
      editorState.selectedSubCategoryIndex
    ].articles.splice(articleIndex, 1)

    dispatch(setEditor(newCopy))
    if (articleIndex === editorState.selectedArticle) {
      dispatch(selectArticleIndex(-1))
    }
  }

  const handleSelectCategory = (itemName) => {
    dispatch(selectArticleIndex(itemName))
  }

  return (
    <DropdownSelector
      options={articles}
      disabled={editorState.selectedSubCategoryIndex === -1}
      placeholder={articles[editorState.selectedArticleIndex] ?? "Artigo"}
      onSelect={handleSelectCategory}
      handleChange={handleChangeCategory}
      handleAdd={handleAddCategory}
      handleRemove={handleRemoveCategory}
    />
  )
}
