import { useDispatch, useSelector } from "react-redux"
import { DropdownSelector } from "./DropdownSelector"
import {
  setEditor,
  selectSubCategoryIndex,
  selectArticleIndex,
} from "../../../store/editorSlice"

export const SubCategoryDropdown = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.editor
  let newCopy = JSON.parse(JSON.stringify(editorData))

  const subCategories =
    editorData[editorState.selectedCategoryIndex]?.subCategories.map(
      ({ title }) => title
    ) ?? []

  const handleChangeSubCategory = (newName, oldName) => {
    const subCategoryIndex = subCategories.indexOf(oldName)
    if (subCategoryIndex === -1 || subCategories.includes(newName)) {
      return
    }
    newCopy[editorState.selectedCategoryIndex].subCategories[
      subCategoryIndex
    ].title = newName
    dispatch(setEditor(newCopy))
    if (oldName === editorState.selectedSubCategory) {
      dispatch(selectSubCategoryIndex(subCategoryIndex))
    }
  }
  const handleAddSubCategory = () => {
    if (subCategories.includes("Nova sub categoria")) {
      return
    }
    const newSubCategory = {
      title: "Nova sub categoria",
      articles: [],
    }
    newCopy[editorState.selectedCategoryIndex].subCategories.push(
      newSubCategory
    )
    dispatch(setEditor(newCopy))
  }

  const handleRemoveSubCategory = (itemName) => {
    const subCategoryIndex = subCategories.indexOf(itemName)

    newCopy[editorState.selectedCategoryIndex].subCategories.splice(
      subCategoryIndex,
      1
    )

    dispatch(setEditor(newCopy))

    if (itemName === editorState.selectedSubCategory) {
      dispatch(selectSubCategoryIndex(-1))
      dispatch(selectArticleIndex(-1))
    }
  }

  const handleSelectCategory = (itemName) => {
    dispatch(selectSubCategoryIndex(itemName))
    dispatch(selectArticleIndex(-1))
  }

  return (
    <DropdownSelector
      options={subCategories}
      disabled={editorState.selectedCategoryIndex === -1}
      placeholder={
        subCategories[editorState.selectedSubCategoryIndex] ?? "Sub Categoria"
      }
      onSelect={handleSelectCategory}
      handleChange={handleChangeSubCategory}
      handleAdd={handleAddSubCategory}
      handleRemove={handleRemoveSubCategory}
    />
  )
}
