import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { addFavorite, removeFavorite } from "../../../store/homeDataSlice"

export const FavoriteButton = ({ id }) => {
  const favoritesData = useSelector((state) => state.homeData.favorites)
  const isFav = favoritesData?.includes(id)

  const dispatch = useDispatch()
  return (
    <IconButton
      $isFav={isFav}
      onClick={() => {
        if (isFav) {
          dispatch(removeFavorite(id))
        } else {
          dispatch(addFavorite(id))
        }
      }}
    >
      <FaHeart />
      <FaRegHeart />
    </IconButton>
  )
}

const IconButton = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    cursor: pointer;
    transition: opacity 250ms;
  }
  svg:nth-child(1) {
    opacity: ${(props) => (props.$isFav ? "1" : "0")};
    color: red;
  }
  svg:nth-child(2) {
    opacity: ${(props) => (props.$isFav ? "0" : "1")};
    color: var(--home-card-color);
  }

  user-select: none;
`
