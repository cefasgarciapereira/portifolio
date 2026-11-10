"use client";

import { ReactNode } from "react";

import Button from "@/components/atoms/Button";

export interface MailAddress {
  user: string;
  domain: string;
}

interface MailButtonProps {
  address: MailAddress;
  children: ReactNode;
  className?: string;
}

export default function MailButton({ address, children, className }: MailButtonProps) {
  const openMailClient = () => {
    window.location.href = `mailto:${address.user}@${address.domain}`;
  };

  return (
    <Button variant="primary" className={className} onClick={openMailClient}>
      {children}
    </Button>
  );
}
