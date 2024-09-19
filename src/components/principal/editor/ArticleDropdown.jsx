import { useDispatch, useSelector } from "react-redux"
import { DropdownSelector } from "./DropdownSelector"
import {
  addArticle,
  removeArticle,
  selectArticle,
  changeNameArticle,
  changeOrderArticle,
} from "../../../store/editorSlice"
import {
  createAlertSucess,
  createAlertWarning,
} from "../../../store/alertSlice"
import { useMemo } from "react"

export const ArticleDropdown = () => {
  const dispatch = useDispatch()

  const selectedCategoryIndex = useSelector(
    (state) => state.editor.selectedCategoryIndex
  )
  const selectedSubCategoryIndex = useSelector(
    (state) => state.editor.selectedSubCategoryIndex
  )
  const selectedArticleIndex = useSelector(
    (state) => state.editor.selectedArticleIndex
  )

  const articles = useSelector(
    (state) =>
      state.editor.environment?.categories[selectedCategoryIndex]
        ?.subCategories[selectedSubCategoryIndex]?.articles
  )

  const articlesOptions = useMemo(
    () => articles ?? [],
    [articles, selectedSubCategoryIndex, selectedCategoryIndex]
  )

  const articlesTitles = useMemo(
    () => articlesOptions.map(({ title }) => title),
    [articlesOptions]
  )

  const handleChangeCategory = useMemo(
    () => (newName, oldName) => {
      if (newName === oldName) return
      const articleIndex = articlesTitles.indexOf(oldName)
      if (articleIndex === -1 || articlesTitles.includes(newName)) {
        dispatch(createAlertWarning("Atenção: Este artigo já existe."))
        return
      }
      dispatch(changeNameArticle({ newName: newName, index: articleIndex }))
      dispatch(createAlertSucess("Alterado com sucesso!"))
    },
    [dispatch, articlesTitles]
  )

  const handleAddArticle = () => {
    if (articlesTitles.includes("Novo artigo")) {
      dispatch(createAlertWarning("Atenção: Este artigo já existe."))
      return
    }

    dispatch(addArticle())
    dispatch(createAlertSucess("Artigo adicionado com sucesso!"))
  }

  const handleRemoveArticle = (index) => {
    dispatch(removeArticle({ index: index }))
    dispatch(createAlertSucess("Artigo removido com sucesso!"))
  }

  const handleSelectCategory = (index) => {
    dispatch(selectArticle(index))
  }

  const handleReorder = (newList) => {
    dispatch(changeOrderArticle(newList))
  }

  const selected = () => {
    const objDefault = {
      title: "Artigo",
    }
    const obj = articlesOptions[selectedArticleIndex]
    if (obj) {
      return obj
    }
    return objDefault
  }

  return (
    <DropdownSelector
      options={articlesOptions}
      disabled={selectedSubCategoryIndex === -1}
      placeholder={selected()}
      onSelect={handleSelectCategory}
      handleChange={handleChangeCategory}
      handleAdd={handleAddArticle}
      handleRemove={handleRemoveArticle}
      handleReorder={handleReorder}
    />
  )
}
