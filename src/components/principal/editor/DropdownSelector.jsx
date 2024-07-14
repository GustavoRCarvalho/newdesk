import { AnimatePresence, motion, useIsPresent } from "framer-motion"
import { useEffect, useState } from "react"
import { FaCaretDown } from "react-icons/fa"
import { GoCheck, GoPencil, GoPlus, GoTrash } from "react-icons/go"
import styled from "styled-components"
import { DynaminicIcon } from "../../../router/DynamicIcon"
import { useDispatch } from "react-redux"
import { toggleChangeIcon } from "../../../store/modalSlice"

export const DropdownSelector = ({
  options = [],
  disabled = false,
  placeholder = "select",
  onSelect,
  handleChange,
  handleAdd,
  handleRemove,
}) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [editable, setEditable] = useState()
  const [newNameValue, setNewNameValue] = useState("")

  useEffect(() => {
    if (JSON.stringify(options) === "[]" && disabled) {
      setIsOpen(false)
    }
  }, [options, disabled])

  const handleCheck = () => {
    if (
      options.map(({ title }) => title).indexOf(newNameValue) > -1 ||
      newNameValue === ""
    ) {
      setEditable("")
      return
    }
    handleChange(newNameValue, editable)
    setEditable("")
  }

  useEffect(() => {
    if (editable === "") {
      return
    }
    setNewNameValue(editable)
  }, [editable])

  return (
    <DropdownContainer layout>
      <ButtonDropdown
        layout
        onClick={() => !disabled && setIsOpen((state) => !state)}
        $disabled={disabled}
        $isOpen={isOpen}
      >
        {placeholder.Icon !== undefined && (
          <DynaminicIcon iconName={placeholder.Icon} />
        )}
        <span>{placeholder.title}</span>
        <FaCaretDown className="downArrow" />
      </ButtonDropdown>
      <DropdownOptions
        layout
        animate={isOpen ? "open" : "closed"}
        initial={{
          height: "0em",
        }}
        variants={{
          open: {
            width: "100%",
            height: "auto",
          },
          closed: {
            width: "100%",
            height: "0em",
          },
        }}
      >
        <AnimatePresence>
          {[...options].map(({ title, Icon }, index) => {
            const isEditable = editable === title
            return (
              <Item key={title} isEditable={isEditable}>
                <DropdownText onClick={() => onSelect(index)}>
                  {Icon !== undefined && (
                    <DynaminicIcon
                      onClick={() => {
                        console.log(title, Icon)
                        dispatch(toggleChangeIcon({ title: title, Icon: Icon }))
                      }}
                      iconName={Icon}
                    />
                  )}
                  <DropdownInput
                    type="text"
                    value={isEditable ? newNameValue || "" : title}
                    onChange={(e) => setNewNameValue(e.target.value)}
                    disabled={!isEditable}
                  />
                  <InputClick $disabled={isEditable}></InputClick>
                </DropdownText>
                <OptionIcons>
                  {isEditable ? (
                    <GoCheck onClick={handleCheck} />
                  ) : (
                    <GoPencil onClick={() => setEditable(title)} />
                  )}
                  <GoTrash onClick={() => handleRemove(title)} />
                </OptionIcons>
              </Item>
            )
          })}
          <AddDropdown layout onClick={handleAdd}>
            <DropdownText>
              <FakeIcon></FakeIcon>
              Adicionar
            </DropdownText>
            <OptionIcons>
              <GoPlus />
            </OptionIcons>
          </AddDropdown>
        </AnimatePresence>
      </DropdownOptions>
    </DropdownContainer>
  )
}

const Item = ({ children, isEditable }) => {
  const isPresent = useIsPresent()
  const animations = {
    style: {
      position: isPresent ? "static" : "absolute",
    },
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  }
  return (
    <DropdownItem {...animations} layout $isEditable={isEditable}>
      {children}
    </DropdownItem>
  )
}

const ButtonDropdown = styled(motion.div)`
  width: calc(100% - 2em);
  padding: 0.5em 1em;

  color: ${(props) =>
    props.$disabled ? "var(--edit-dropdown-editable)" : "unset"};

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: ${(props) =>
    props.$isOpen ? "2px solid var(--edit-dropdown)" : "2px solid transparent"};
  border-radius: 0.5em;

  gap: 0.5em;

  span {
    width: 100%;
    text-align: start;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  svg {
    width: 1.5em;
    height: 1.5em;
  }

  .downArrow {
    width: 1em;
    height: 1em;
    transform: ${(props) =>
      props.$isOpen ? "rotateZ(180deg)" : "rotateZ(0deg)"};
    transition: 0.4s;
  }

  cursor: pointer;
`

const FakeIcon = styled.div`
  width: 1.35em;
  height: 1.3em;
`

const OptionIcons = styled.div`
  display: flex;
  align-items: center;
  color: var(--edit-dropdown-editable);

  gap: 0.3em;

  svg {
    width: 1.3em;
    height: 1.3em;

    cursor: pointer;
  }
`

const DropdownContainer = styled(motion.div)`
  background-color: var(--home-card-background);
  height: min-content;

  flex: 1;
  max-width: calc(920px / 3);
  max-height: 20em;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 0.5em;
  box-shadow: 0em 0em 1em 0em #0000004b;
`

const DropdownOptions = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
    margin-bottom: 50px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;

    border-radius: 1em;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`

const DropdownItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;

  color: ${(props) =>
    props.$isEditable
      ? "var(--edit-dropdown-editable)"
      : "var(--edit-dropdown)"};

  width: calc(100% - 2em);
  padding: 0em 0em 0.8em 0em;
  margin: 1em 1em 0em 1em;

  border-bottom: 1px solid var(--edit-dropdown-editable);
`

const AddDropdown = styled(DropdownItem)`
  width: calc(100% - 2em);

  border-bottom: none;
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;

  margin: 0;
  padding: 1em 1em 0.8em 1em;
  &:hover {
    background-color: var(--edit-dropdown-editable-hover);
  }

  cursor: pointer;
`

const DropdownText = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  align-items: center;

  gap: 0.3em;

  svg {
    width: 1.5em;
    height: 1.5em;
  }
`

const DropdownInput = styled.input`
  background-color: transparent;
  font-size: 1em;

  width: 100%;

  display: flex;
  align-items: center;

  border: none;
  outline: none;

  color: var(--edit-dropdown-editable);
  &:disabled {
    color: var(--edit-dropdown);
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const InputClick = styled.div`
  position: absolute;
  display: ${(props) => (props.$disabled ? "none" : "block")};

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  cursor: pointer;
`
