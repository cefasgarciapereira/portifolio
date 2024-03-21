import { useEffect, useState } from "react";

export default function useNavigation() {
  const [location, setLocation] = useState<string>("")

  useEffect(() => {
    setLocation(window.location.pathname);
  }, [])

  function navigate(to: string) {
    window.location.href = to
  }

  return { location, navigate }
}