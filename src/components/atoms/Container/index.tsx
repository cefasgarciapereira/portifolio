import { ReactNode } from "react";

import styles from "./container.module.css";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}
