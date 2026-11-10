import { ElementType, ReactNode } from "react";

import styles from "./box.module.css";

interface BoxProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

export default function Box({ children, as: Tag = "div", className = "" }: BoxProps) {
  return <Tag className={`${styles.box} ${className}`}>{children}</Tag>;
}
