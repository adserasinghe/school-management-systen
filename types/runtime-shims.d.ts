declare module "lucide-react" {
  import type { ComponentType, SVGProps } from "react";

  type Icon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }>;

  export const ArrowUpRight: Icon;
  export const ArrowRight: Icon;
  export const BarChart3: Icon;
  export const Bell: Icon;
  export const Building2: Icon;
  export const BookOpen: Icon;
  export const CalendarCheck2: Icon;
  export const CalendarDays: Icon;
  export const Check: Icon;
  export const ChevronDown: Icon;
  export const ChevronRight: Icon;
  export const CircleHelp: Icon;
  export const Download: Icon;
  export const Eye: Icon;
  export const EyeOff: Icon;
  export const FileQuestion: Icon;
  export const FileText: Icon;
  export const Filter: Icon;
  export const LayoutDashboard: Icon;
  export const LockKeyhole: Icon;
  export const Mail: Icon;
  export const Menu: Icon;
  export const MessageCircle: Icon;
  export const MoreHorizontal: Icon;
  export const Plus: Icon;
  export const Printer: Icon;
  export const Save: Icon;
  export const Search: Icon;
  export const Settings: Icon;
  export const ShieldCheck: Icon;
  export const SlidersHorizontal: Icon;
  export const SquareStack: Icon;
  export const Trophy: Icon;
  export const UserRound: Icon;
  export const UserRoundPlus: Icon;
  export const UsersRound: Icon;
  export const X: Icon;
}

declare module "next/navigation" {
  export function usePathname(): string;
  export function redirect(url: string): never;
}

declare module "next/types.js" {
  export type ResolvingMetadata = unknown;
  export type ResolvingViewport = unknown;
}
