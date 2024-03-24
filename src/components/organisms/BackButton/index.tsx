import { FiArrowLeft } from "react-icons/fi"
import useNavigation from "../../../services/useNavigation"

interface BackButtonProps {
  path: string
}

export default function BackButton(props: BackButtonProps) {
  const { navigate } = useNavigation()

  return (
    <button
      className="btn--clean circular"
      onClick={() => navigate(props.path)}
    >
      <FiArrowLeft />
    </button>
  )
}