import { useDispatch, useSelector } from "react-redux"
import { DropdownSelector } from "./DropdownSelector"
import {
  setEditor,
  selectCategoryIndex,
  selectSubCategoryIndex,
  selectArticleIndex,
} from "../../../store/editorSlice"

export const CategoryDropdown = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.editor
  let newCopy = JSON.parse(JSON.stringify(editorData))

  const categoriesOptions = editorData
  const categories = editorData.map(({ title }) => title)

  const handleChangeCategory = (newName, oldName) => {
    const categoryIndex = categories.indexOf(oldName)
    if (categoryIndex === -1 || categories.includes(newName)) {
      return
    }

    newCopy[categoryIndex].title = newName
    dispatch(setEditor(newCopy))
  }

  const handleAddCategory = () => {
    if (categories.includes("Nova categoria")) {
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
    const categoryIndex = categories.indexOf(itemName)

    newCopy.splice(categoryIndex, 1)
    dispatch(setEditor(newCopy))
    if (categoryIndex === editorState.selectedCategoryIndex) {
      dispatch(selectCategoryIndex(-1))
      dispatch(selectSubCategoryIndex(-1))
      dispatch(selectArticleIndex(-1))
    }
  }

  const handleSelectCategory = (itemIndex) => {
    dispatch(selectCategoryIndex(itemIndex))
    dispatch(selectSubCategoryIndex(-1))
    dispatch(selectArticleIndex(-1))
  }

  const selected = () => {
    const objDefault = {
      title: "Categoria",
      Icon: "",
    }
    const obj = categoriesOptions[editorState.selectedCategoryIndex]
    if (obj) {
      return obj
    }
    return objDefault
  }

  return (
    <DropdownSelector
      options={categoriesOptions}
      placeholder={selected()}
      onSelect={handleSelectCategory}
      handleChange={handleChangeCategory}
      handleAdd={handleAddCategory}
      handleRemove={handleRemoveCategory}
    />
  )
}
