import { Home } from "@geist-ui/icons";
import Link from "next/link";

export default function HomeButton() {
  return (
    <Link href="/" className="menu-item">
      home
    </Link>
  );
}
