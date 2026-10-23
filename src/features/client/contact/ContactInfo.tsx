"use client";

import { m } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

import { SocialLinks } from "@/components/social-links";
import type { SocialLink } from "@/constants/social";
import {
  formatPhone,
  toMailHref,
  toTelHref,
  toWhatsAppUrl,
} from "@/lib/contact";

interface ContactInfoProps {
  phone: string;
  email: string;
  socials: SocialLink[];
}

export const ContactInfo = ({ phone, email, socials }: ContactInfoProps) => {
  const contactDetails = [
    {
      icon: Mail,
      title: "Email Us",
      value: email,
      href: toMailHref(email),
    },
    {
      icon: Phone,
      title: "Call Us",
      value: formatPhone(phone),
      href: toTelHref(phone),
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
              <p className="break-all text-sm text-foreground-second">
                {item.value}
              </p>
            </m.a>
          );
        })}

        <m.a
          href={toWhatsAppUrl(
            phone,
            "Hello, I would like to know more about your courses.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: contactDetails.length * 0.1 }}
          className="group flex items-center gap-3 border border-success/30 bg-success/10 p-3 transition-colors hover:border-success sm:col-span-2 sm:p-4"
        >
          <MessageCircle className="size-6 shrink-0 text-success" />
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Chat on WhatsApp
            </h3>
            <p className="text-sm text-foreground-second">
              Fastest way to reach our team.
            </p>
          </div>
        </m.a>
      </div>

      {socials.length > 0 && (
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
          <SocialLinks links={socials} size="md" />
        </m.div>
      )}
    </div>
  );
};
