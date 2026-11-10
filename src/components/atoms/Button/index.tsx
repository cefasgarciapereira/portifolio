import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./button.module.css";

type ButtonVariant = "default" | "primary";

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

type LinkButtonProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ActionButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonProps = LinkButtonProps | ActionButtonProps;

function isInternalRoute(href: string, download: unknown) {
  return href.startsWith("/") && !download;
}

export default function Button({ children, variant = "default", className = "", ...props }: ButtonProps) {
  const classes = `${styles.button} ${variant === "primary" ? styles.primary : ""} ${className}`;

  if (props.href !== undefined) {
    const { href, ...anchorProps } = props as LinkButtonProps;
    if (isInternalRoute(href, anchorProps.download)) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(props as ActionButtonProps)}>
      {children}
    </button>
  );
}
