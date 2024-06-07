import styled from "styled-components"

export const SideMenu = () => {
  return (
    <SideContainer>
      <DropdownButton>
        <DropText>
          III <span>Favoritos</span>
        </DropText>
        <DropButtonOpen>?</DropButtonOpen>
      </DropdownButton>
    </SideContainer>
  )
}

const DropButtonOpen = styled.div``

const DropText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const SideContainer = styled.div`
  background-color: var(--side-menu-background);
  height: 100dvh;
  min-width: 400px;
`

const DropdownButton = styled.div`
  font-size: 1.4em;

  color: var(--side-menu-item);

  display: flex;
  justify-content: space-between;

  margin: 0.5em;
  padding: 0.5em 1em;
  gap: 1em;

  border-radius: 15px;

  cursor: pointer;

  &:hover {
    color: var(--side-menu-item-select);
    background-color: var(--side-menu-background-select);
  }
`
