import {
  Binary,
  Braces,
  Calculator,
  Clock,
  Database,
  FileArchive,
  FileCode2,
  FileText,
  Globe,
  Hash,
  Image,
  KeyRound,
  Link2,
  Palette,
  Play,
  QrCode,
  Regex,
  Repeat,
  Server,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Table2,
  Terminal,
  Type,
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
  "file-code-2": FileCode2,
  "table-2": Table2,
  "file-text": FileText,
  "file-archive": FileArchive,
  calculator: Calculator,
  type: Type,
  repeat: Repeat,
} as const;

export type IconName = keyof typeof ICONS;

export function getIcon(name: IconName | string): LucideIcon {
  return ICONS[name as IconName] ?? Wrench;
}
