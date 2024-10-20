import {
  AnimatePresence,
  motion,
  Reorder,
  useDragControls,
  useIsPresent,
} from "framer-motion"
import { useEffect, useLayoutEffect, useState } from "react"
import { FaCaretDown } from "react-icons/fa"
import { GoCheck, GoPencil, GoPlus, GoTrash } from "react-icons/go"
import Grabber from "../../../assets/icons/Grabber.svg"
import styled from "styled-components"
import { DynaminicIcon } from "../../../router/DynamicIcon"
import { useDispatch } from "react-redux"
import { toggleChangeIcon } from "../../../store/modalSlice"
import { useSelector } from "react-redux"
import { useCallback } from "react"

export const DropdownSelector = ({
  options = [],
  disabled = false,
  placeholder = "select",
  onSelect,
  handleChange,
  handleAdd,
  handleRemove,
  handleReorder,
}) => {
  const articleChanged = useSelector((state) => state.editor.articleChanged)
  const [isOpen, setIsOpen] = useState(false)

  useLayoutEffect(() => {
    if (disabled) setIsOpen(false)
  }, [disabled])

  return (
    <DropdownContainer layout={"position"}>
      <ButtonDropdown
        layout
        onClick={() => !disabled && setIsOpen((state) => !state)}
        $disabled={disabled}
        $isOpen={isOpen}
      >
        <DynaminicIcon iconName={placeholder.Icon} />
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
          <DropdownGroup axis="y" values={options} onReorder={handleReorder}>
            {options.map(({ title }, index) => {
              return (
                <Item
                  key={title}
                  value={options[index]}
                  index={index}
                  onSelect={onSelect}
                  handleChange={handleChange}
                  handleRemove={handleRemove}
                  articleChanged={articleChanged}
                ></Item>
              )
            })}
            <AddDropdown
              layout
              onClick={handleAdd}
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { opacity: 1 },
                closed: {
                  opacity: 0,
                },
              }}
              transition={{ duration: 0 }}
            >
              <DropdownText>
                <FakeIcon></FakeIcon>
                Adicionar
              </DropdownText>
              <OptionIcons>
                <GoPlus />
              </OptionIcons>
            </AddDropdown>
          </DropdownGroup>
        </AnimatePresence>
      </DropdownOptions>
    </DropdownContainer>
  )
}

const Item = ({
  value,
  index,
  onSelect,
  handleChange,
  handleRemove,
  articleChanged,
}) => {
  const dispatch = useDispatch()
  const controls = useDragControls()
  const isPresent = useIsPresent()
  const animations = {
    style: {
      position: isPresent ? "static" : "absolute",
    },
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  }
  const [newNameValue, setNewNameValue] = useState("")
  const [editable, setEditable] = useState(false)

  const handleClickIcon = useCallback(() => {
    if (value.Icon === undefined) return
    dispatch(
      toggleChangeIcon({
        title: value.title,
        Icon: value.Icon,
      })
    )
  }, [dispatch, value.title, value.Icon])

  useEffect(() => {
    if (!editable) {
      return
    }
    setNewNameValue(value.title)
  }, [editable])

  const handleCheck = useCallback(() => {
    if (newNameValue === "") {
      setEditable(false)
      return
    }
    handleChange(newNameValue, value.title)
    setEditable(false)
  }, [newNameValue, value.title])

  return (
    <DropdownItem
      {...animations}
      dragListener={false}
      dragControls={controls}
      value={value}
      $isEditable={editable}
    >
      {!articleChanged && (
        <GrabberButton onPointerDown={(e) => controls.start(e)}>
          <GrabberIcon src={Grabber} />
        </GrabberButton>
      )}

      <DropdownText>
        {value.Icon !== undefined && (
          <DynaminicIcon onClick={handleClickIcon} iconName={value.Icon} />
        )}
        <DropdownInput
          type="text"
          value={editable ? newNameValue || "" : value.title}
          onChange={(e) => setNewNameValue(e.target.value.replace("/", ""))}
          disabled={!editable}
        />
        <InputClick
          onClick={() => !articleChanged && onSelect(index)}
          $disabled={editable}
        ></InputClick>
      </DropdownText>
      <OptionIcons>
        {editable ? (
          <GoCheck onClick={handleCheck} />
        ) : (
          <GoPencil onClick={() => setEditable(true)} />
        )}
        <GoTrash onClick={() => handleRemove(index)} />
      </OptionIcons>
    </DropdownItem>
  )
}

const ButtonDropdown = styled(motion.div)`
  width: calc(100% - 2em - 4px);
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

  user-select: none;
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

const DropdownGroup = styled(Reorder.Group)`
  margin: 0;
  padding: 0;

  width: 100%;
`

const DropdownItem = styled(Reorder.Item)`
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
  user-select: none;
`

const AddDropdown = styled(motion.div)`
  display: flex;
  justify-content: space-between;

  color: ${(props) =>
    props.$isEditable
      ? "var(--edit-dropdown-editable)"
      : "var(--edit-dropdown)"};

  border-bottom: 1px solid var(--edit-dropdown-editable);
  user-select: none;
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
    cursor: pointer;
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

const GrabberButton = styled.div`
  width: 1.2em;
  height: 1.2em;

  margin: 0.2em 0.6em 0.2em 0;
  cursor: grab;

  user-select: none;
`
const GrabberIcon = styled.img`
  width: 100%;
  height: 100%;

  user-select: none;
  pointer-events: none;
`
