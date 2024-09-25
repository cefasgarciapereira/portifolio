import { Eye, EyeOff } from '@geist-ui/icons'

import Toggler from "@/components/atoms/Toggler"
import { Fragment } from 'react'

export default function ContrastToggler() {
  return <Toggler
    className="theme-contrast"
    iconOn={<Fragment>default</Fragment>}
    iconOff={<Fragment>contrast</Fragment>}
  />
}