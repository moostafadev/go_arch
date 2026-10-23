import { formatPhone } from "@/lib/contact";
import { fetchContactSettings, fetchSocialLinks } from "@/lib/site-settings";

export const StructuredData = async () => {
  const [contact, socials] = await Promise.all([
    fetchContactSettings(),
    fetchSocialLinks(),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "GO ARCH Academy",
    ...(siteUrl ? { url: siteUrl } : {}),
    email: contact.email,
    telephone: formatPhone(contact.phone),
    sameAs: socials.map((link) => link.url),
  };

  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};
