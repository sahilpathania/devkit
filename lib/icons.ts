import {
  Binary,
  Braces,
  Clock,
  Database,
  Globe,
  Hash,
  Image,
  KeyRound,
  Link2,
  Palette,
  Play,
  QrCode,
  Regex,
  Server,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * String-keyed icon registry — icons cannot be serialized across
 * the RSC / Client Component boundary, so we pass names instead.
 */
export const ICONS = {
  braces: Braces,
  "shield-check": ShieldCheck,
  shield: Shield,
  "key-round": KeyRound,
  binary: Binary,
  hash: Hash,
  "qr-code": QrCode,
  regex: Regex,
  clock: Clock,
  palette: Palette,
  play: Play,
  "link-2": Link2,
  terminal: Terminal,
  globe: Globe,
  server: Server,
  smartphone: Smartphone,
  image: Image,
  database: Database,
  sparkles: Sparkles,
  wrench: Wrench,
} as const;

export type IconName = keyof typeof ICONS;

export function getIcon(name: IconName | string): LucideIcon {
  return ICONS[name as IconName] ?? Wrench;
}
