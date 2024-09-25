'use client'

import { useEffect, useState } from "react"

interface TogglerProps {
  iconOn: JSX.Element
  iconOff: JSX.Element
  className: string
}

export default function Toggler(props: TogglerProps) {
  const [isToggleOn, setIsToggleOn] = useState(false)
  const { iconOn, iconOff, className } = props
  useEffect(() => {
    let body = document.getElementsByTagName("body")[0]

    if (isToggleOn) {
      body.classList.add(className)
    } else {
      body.classList.remove(className)
    }
  }, [isToggleOn])

  function toggleContrast() {
    setIsToggleOn(!isToggleOn)
  }

  return (
    <a onClick={toggleContrast} className="menu-item cursor-pointer">
      {isToggleOn ? iconOn : iconOff}
    </a>
  )
}

