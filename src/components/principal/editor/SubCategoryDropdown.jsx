import { useDispatch, useSelector } from "react-redux"
import { DropdownSelector } from "./DropdownSelector"
import {
  setEditor,
  selectSubCategory,
  selectArticle,
} from "../../../store/editorSlice"

export const SubCategoryDropdown = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.editor
  let newCopy = JSON.parse(JSON.stringify(editorData))

  const indexCategory = editorData
    .map(({ title }) => title)
    .indexOf(editorState.selectedCategory)

  const subCategories =
    editorData[indexCategory]?.subCategories.map(({ title }) => title) ?? []

  const handleChangeSubCategory = (newName, oldName) => {
    const subCategoryIndex = subCategories.indexOf(oldName)
    if (subCategoryIndex === -1) {
      return
    }
    newCopy[indexCategory].subCategories[subCategoryIndex].title = newName
    dispatch(setEditor(newCopy))
    if (oldName === editorState.selectedSubCategory) {
      dispatch(selectSubCategory(newName))
    }
  }
  const handleAddSubCategory = () => {
    if (subCategories.indexOf("Nova sub categoria") > -1) {
      return
    }
    const newSubCategory = {
      title: "Nova sub categoria",
      articles: [],
    }
    newCopy[indexCategory].subCategories.push(newSubCategory)
    dispatch(setEditor(newCopy))
  }

  const handleRemoveSubCategory = (itemName) => {
    const subCategoryIndex = subCategories.indexOf(itemName)

    newCopy[indexCategory].subCategories.splice(subCategoryIndex, 1)

    dispatch(setEditor(newCopy))

    if (itemName === editorState.selectedSubCategory) {
      dispatch(selectSubCategory(""))
      dispatch(selectArticle(""))
    }
  }

  const handleSelectCategory = (itemName) => {
    dispatch(selectSubCategory(itemName))
  }

  return (
    <DropdownSelector
      options={subCategories}
      disabled={editorState.selectedCategory === ""}
      placeholder={
        editorState.selectedSubCategory !== ""
          ? editorState.selectedSubCategory
          : "Sub Categoria"
      }
      onSelect={handleSelectCategory}
      handleChange={handleChangeSubCategory}
      handleAdd={handleAddSubCategory}
      handleRemove={handleRemoveSubCategory}
    />
  )
}
