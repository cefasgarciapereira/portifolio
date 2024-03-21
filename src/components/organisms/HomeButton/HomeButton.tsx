import { FiHome } from "react-icons/fi"
import useNavigation from "../../../services/useNavigation"

export default function HomeButton() {
  const { navigate } = useNavigation()

  return (
    <button
      className="btn--clean circular"
      onClick={() => navigate("/")}
    >
      <FiHome />
    </button>
  )
}