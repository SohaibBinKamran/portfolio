import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";

export const metadata: Metadata = {
  title: "Contact | Sohaib Bin Kamran",
  description:
    "Let's collaborate — get in touch to turn your product ideas into impactful designs.",
};

export default function ContactPage() {
  return <ContactHero />;
}
