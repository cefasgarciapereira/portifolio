import { MailAddress } from "@/components/atoms/MailButton";

export const contactAddress: MailAddress = { user: "cefasgarciapereira", domain: "gmail.com" };

export interface Social {
  name: string;
  handle: string;
  link: string;
}

export const socials: Social[] = [
  { name: "LinkedIn", handle: "in/cefas-garcia-pereira", link: "https://www.linkedin.com/in/cefas-garcia-pereira" },
  { name: "Medium", handle: "@cefasgpereira", link: "https://cefasgpereira.medium.com/" },
  { name: "GitHub", handle: "github.com/cefasgarciapereira", link: "https://github.com/cefasgarciapereira" },
];
