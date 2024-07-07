import React, { Suspense } from "react"
import { FaIcons } from "react-icons/fa6"

export const DynaminicIcon = ({ iconName }) => {
  if (!iconName) {
    return <FaIcons />
  }
  const library = iconName.split(/(?=[A-Z])/)[0].toLowerCase()

  let IconComponent = React.lazy(async () => {
    try {
      const icons = await import(`react-icons/ai`)
      return { default: icons[iconName] }
    } catch (err) {
      return { default: () => <FaIcons /> }
    }
  })
  if (library === "bs") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/bs`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "bi") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/bi`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "ci") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/ci`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "cg") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/cg`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "di") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/di`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "fi") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/fi`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "fc") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/fc`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "fa") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/fa`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "fa6") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/fa6`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "gi") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/gi`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "go") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/go`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "gr") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/gr`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "hi") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/hi`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "hi2") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/hi2`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "im") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/im`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "lia") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/lia`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "io") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/io`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "io5") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/io5`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "lu") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/lu`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "md") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/md`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "pi") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/pi`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "rx") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/rx`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "ri") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/ri`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "si") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/si`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "sl") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/sl`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "tb") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/tb`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "tfi") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/tfi`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "ti") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/ti`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "vsc") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/vsc`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  } else if (library === "wi") {
    IconComponent = React.lazy(async () => {
      try {
        const icons = await import(`react-icons/wi`)
        return { default: icons[iconName] }
      } catch (err) {
        return { default: () => <FaIcons /> }
      }
    })
  }

  return (
    <Suspense fallback={<div></div>}>
      <IconComponent />
    </Suspense>
  )
}
