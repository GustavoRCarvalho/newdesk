import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

export const NoStyleLinkRouter = (props) => {
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const environment = params.get("environment")

  return (
    <NoStyleLink
      {...props}
      to={`${props.to}?environment=${environment}`}
      onClick={() => {
        window.scrollTo(0, 0)
      }}
    >
      {props.children}
    </NoStyleLink>
  )
}

const NoStyleLink = styled(Link)`
  text-decoration: none;
  color: unset;
`
