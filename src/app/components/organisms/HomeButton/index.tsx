import { Home } from "@geist-ui/icons";
import Link from "next/link";

export default function HomeButton() {
  return (
    <Link href="/">
      <button className="btn--clean circular">
        <Home />
      </button>
    </Link>
  );
}
