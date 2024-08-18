import { Link, useSearchParams } from "react-router-dom"
import styled from "styled-components"

export const NoStyleLinkRouter = (props) => {
  const [searchParams] = useSearchParams()
  const environment = searchParams.get("environment")

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
