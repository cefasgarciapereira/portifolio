import { useEffect, useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ContrastToggler() {
    const [isContrastOn, setIsContrastOn] = useState(false)

    useEffect(() => {
        let body = document.getElementsByTagName("body")[0]

        if (isContrastOn) {
            body.classList.add("theme-contrast")
        } else {
            body.classList.remove("theme-contrast")
        }
    }, [isContrastOn])

    function toggleContrast() {
        setIsContrastOn(!isContrastOn)
    }

    return (
        <button
            onClick={toggleContrast}
            className="btn--clean circular"
        >
            {isContrastOn ? <FiEyeOff /> : <FiEye />}
        </button>
    )
}