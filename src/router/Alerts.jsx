import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { removeAlert } from "../store/alertSlice"
import { AnimatePresence, motion, useIsPresent } from "framer-motion"
import { GoX } from "react-icons/go"
import { useEffect } from "react"

export const Alerts = () => {
  const alerts = useSelector((state) => state.alert.alerts)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeAlert(alerts[0]?.message))
    }, 3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alerts])

  return (
    <AlertContainer layout>
      <AnimatePresence>
        {[...alerts].map(({ message, color }) => {
          return (
            <AlertItem
              key={message}
              color={color}
              onClick={() => {
                dispatch(removeAlert(message))
              }}
            >
              {message}
              <GoX />
            </AlertItem>
          )
        })}
      </AnimatePresence>
    </AlertContainer>
  )
}

const AlertItem = ({ children, color, onClick }) => {
  const isPresent = useIsPresent()
  const animations = {
    style: {
      position: isPresent ? "static" : "absolute",
    },
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }
  return (
    <AlertMessage {...animations} layout $color={color} onClick={onClick}>
      {children}
    </AlertMessage>
  )
}

const AlertContainer = styled(motion.div)`
  position: fixed;

  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: end;

  gap: 1em;

  padding: 1em;
  z-index: 2;
`

const AlertMessage = styled(motion.div)`
  background-color: ${(props) => props.$color ?? "#8b8b8b"};
  color: var(--card-button-color);

  width: max-content;

  display: flex;
  align-items: center;

  padding: 0.75em 1.5em;
  border-radius: 0.5em;

  gap: 0.5em;

  svg {
    padding: 0.25em;

    width: 1.2em;
    height: 1.2em;

    border-radius: 0.25em;

    &:hover {
      background-color: #00000030;
    }
  }

  user-select: none;
  cursor: pointer;
`
