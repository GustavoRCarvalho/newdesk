import { useDispatch, useSelector } from "react-redux"
import { DropdownSelector } from "./DropdownSelector"
import {
  addArticle,
  removeArticle,
  selectArticle,
  changeNameArticle,
} from "../../../store/editorSlice"
import {
  createAlertSucess,
  createAlertWarning,
} from "../../../store/alertSlice"
import { useMemo } from "react"

export const ArticleDropdown = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state) => state.editor)
  const editorData = editorState.environment

  const articlesOptions = useMemo(
    () =>
      editorData.categories[editorState.selectedCategoryIndex]?.subCategories[
        editorState.selectedSubCategoryIndex
      ]?.articles ?? [],
    [
      editorData.categories,
      editorState.selectedSubCategoryIndex,
      editorState.selectedCategoryIndex,
    ]
  )
  const articles = useMemo(
    () => articlesOptions.map(({ title }) => title),
    [articlesOptions]
  )

  const handleChangeCategory = useMemo(
    () => (newName, oldName) => {
      if (newName === oldName) return
      const articleIndex = articles.indexOf(oldName)
      if (articleIndex === -1 || articles.includes(newName)) {
        dispatch(createAlertWarning("Atenção: Este artigo já existe."))
        return
      }
      dispatch(changeNameArticle({ newName: newName, index: articleIndex }))
      dispatch(createAlertSucess("Alterado com sucesso!"))
    },
    [dispatch, articles]
  )

  const handleAddArticle = () => {
    if (articles.includes("Novo artigo")) {
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
      handleAdd={handleAddArticle}
      handleRemove={handleRemoveArticle}
    />
  )
}
