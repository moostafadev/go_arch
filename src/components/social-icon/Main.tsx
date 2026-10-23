import type { ComponentType } from "react";
import { Globe } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

import type { SocialPlatform } from "@/constants/social";

import type { SocialIconProps } from "./types";

const icons: Record<SocialPlatform, ComponentType<{ className?: string }>> = {
  instagram: FaInstagram,
  x: FaXTwitter,
  telegram: FaTelegram,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  other: Globe,
};

const SocialIcon = ({ platform, className }: SocialIconProps) => {
  const Icon = icons[platform];

  return <Icon aria-hidden="true" className={className} />;
};

export default SocialIcon;
