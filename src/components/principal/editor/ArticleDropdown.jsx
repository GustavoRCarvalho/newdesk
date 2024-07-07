import { useDispatch, useSelector } from "react-redux"
import { DropdownSelector } from "./DropdownSelector"
import { setEditor, selectArticle } from "../../../store/editorSlice"

export const ArticleDropdown = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.editor
  let newCopy = JSON.parse(JSON.stringify(editorData))

  const indexCategory = editorData
    .map(({ title }) => title)
    .indexOf(editorState.selectedCategory)

  const indexSubCategory = editorData[indexCategory]?.subCategories
    .map(({ title }) => title)
    .indexOf(editorState.selectedSubCategory)

  const articles =
    editorData[indexCategory]?.subCategories[indexSubCategory]?.articles.map(
      ({ title }) => title
    ) ?? []

  const handleChangeCategory = (newName, oldName) => {
    const articleIndex = articles.indexOf(oldName)
    if (articleIndex === -1) {
      return
    }
    newCopy[indexCategory].subCategories[indexSubCategory].articles[
      articleIndex
    ].title = newName
    dispatch(setEditor(newCopy))
  }

  const handleAddCategory = () => {
    if (articles.indexOf("Novo artigo") > -1) {
      return
    }
    const newArticle = {
      title: "Nova artigo",
      date: "06 de jun 2024",
      textURL: "text_name",
      data: "",
    }
    newCopy[indexCategory].subCategories[indexSubCategory].articles.push(
      newArticle
    )
    dispatch(setEditor(newCopy))
  }

  const handleRemoveCategory = (itemName) => {
    const articleIndex = articles.indexOf(itemName)

    newCopy[indexCategory].subCategories[indexSubCategory].articles.splice(
      articleIndex,
      1
    )

    dispatch(setEditor(newCopy))
    if (itemName === editorState.selectedArticle) {
      dispatch(selectArticle(""))
    }
  }

  const handleSelectCategory = (itemName) => {
    dispatch(selectArticle(itemName))
  }

  return (
    <DropdownSelector
      options={articles}
      disabled={editorState.selectedSubCategory === ""}
      placeholder={
        editorState.selectedArticle !== ""
          ? editorState.selectedArticle
          : "Artigo"
      }
      onSelect={handleSelectCategory}
      handleChange={handleChangeCategory}
      handleAdd={handleAddCategory}
      handleRemove={handleRemoveCategory}
    />
  )
}
