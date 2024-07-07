import { useDispatch, useSelector } from "react-redux"
import { DropdownSelector } from "./DropdownSelector"
import {
  setEditor,
  selectCategory,
  selectSubCategory,
  selectArticle,
} from "../../../store/editorSlice"

export const CategoryDropdown = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.editor
  const categories = editorData.map(({ title }) => title)
  let newCopy = JSON.parse(JSON.stringify(editorData))

  const handleChangeCategory = (newName, oldName) => {
    const categoryIndex = editorData.map(({ title }) => title).indexOf(oldName)
    if (categoryIndex === -1) {
      return
    }

    newCopy[categoryIndex].title = newName
    dispatch(setEditor(newCopy))
  }

  const handleAddCategory = () => {
    if (editorData.map(({ title }) => title).indexOf("Nova categoria") > -1) {
      return
    }
    const newCategory = {
      title: "Nova categoria",
      Icon: "",
      subCategories: [],
    }
    dispatch(setEditor([...editorData, newCategory]))
  }

  const handleRemoveCategory = (itemName) => {
    const categoryIndex = editorData.map(({ title }) => title).indexOf(itemName)

    newCopy.splice(categoryIndex, 1)
    dispatch(setEditor(newCopy))
    if (itemName === editorState.selectedCategory) {
      dispatch(selectCategory(""))
      dispatch(selectSubCategory(""))
      dispatch(selectArticle(""))
    }
  }

  const handleSelectCategory = (itemName) => {
    dispatch(selectCategory(itemName))
  }

  return (
    <DropdownSelector
      options={categories}
      placeholder={
        editorState.selectedCategory !== ""
          ? editorState.selectedCategory
          : "Categoria"
      }
      onSelect={handleSelectCategory}
      handleChange={handleChangeCategory}
      handleAdd={handleAddCategory}
      handleRemove={handleRemoveCategory}
    />
  )
}
