"use client";

import { m } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const contactDetails = [
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@goarch.academy",
    href: "mailto:hello@goarch.academy",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+20 123 456 7890",
    href: "tel:+201234567890",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Cairo, Egypt (Global Online)",
    href: "#",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Sun - Thu, 9:00 AM - 6:00 PM",
    href: "#",
  },
];

const socials = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaXTwitter, href: "#", label: "Twitter (X)" },
];

export const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-10">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {contactDetails.map((item, index) => {
          const Icon = item.icon;
          return (
            <m.a
              key={item.title}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col border border-border bg-background p-3 transition-colors hover:border-accent/50 hover:bg-card sm:p-4"
            >
              <Icon className="mb-3 size-6 text-foreground-second transition-colors group-hover:text-accent sm:mb-4" />
              <h3 className="mb-1 text-sm font-bold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-foreground-second">{item.value}</p>
            </m.a>
          );
        })}
      </div>

      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="border border-border bg-background p-3 sm:p-4"
      >
        <h3 className="mb-3 text-lg font-bold text-foreground sm:mb-4">
          Follow Our Journey
        </h3>
        <p className="mb-4 text-sm text-foreground-second sm:mb-6">
          Stay updated with our latest student projects, competition wins, and
          architectural insights.
        </p>
        <div className="flex gap-3">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex size-10 items-center justify-center border border-border bg-card text-foreground-second transition-all hover:border-accent hover:bg-accent hover:text-white"
              >
                <Icon className="size-5" />
              </a>
            );
          })}
        </div>
      </m.div>
    </div>
  );
};
