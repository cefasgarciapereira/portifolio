import { Eye, EyeOff } from '@geist-ui/icons'

import Toggler from "@/app/components/atoms/Toggler"

export default function ContrastToggler() {
  return <Toggler className="theme-contrast" iconOn={<Eye />} iconOff={<EyeOff />} />
}