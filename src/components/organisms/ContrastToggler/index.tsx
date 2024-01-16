import { FiEye, FiEyeOff } from "react-icons/fi";

import Toggler from "../../atoms/Toggler"

export default function ContrastToggler() {
    return <Toggler className="theme-contrast" iconOn={<FiEye />} iconOff={<FiEyeOff />} />
}