"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  BarChart3,
  Bell,
  BookOpen,
  CalendarCheck2,
  ChevronDown,
  CircleHelp,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  SquareStack,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { Avatar } from "./ui";

const navigation = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Students", href: "/students", icon: UsersRound },
  { label: "Classes & subjects", href: "/classes", icon: SquareStack },
  { label: "Attendance", href: "/attendance", icon: CalendarCheck2 },
  { label: "Marks & exams", href: "/marks", icon: BookOpen },
  { label: "Reports", href: "/reports", icon: BarChart3 },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-line bg-white transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[84px] items-center justify-between border-b border-line px-6">
          <Link href="/dashboard" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-lg font-black text-white">L</span>
            <span>
              <span className="block text-[17px] font-extrabold tracking-[-0.04em] text-ink">lumen</span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-muted">school OS</span>
            </span>
          </Link>
          <button className="text-muted lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#a1aabc]">Workspace</p>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors ${active ? "bg-brand-50 text-brand-600" : "text-muted hover:bg-canvas hover:text-ink"}`}
                >
                  <Icon size={18} strokeWidth={active ? 2.4 : 2} />
                  {item.label}
                  {item.label === "Attendance" && <span className="ml-auto rounded-full bg-[#fff0f1] px-2 py-0.5 text-[10px] font-bold text-coral">3</span>}
                </Link>
              );
            })}
          </nav>

          <p className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#a1aabc]">Manage</p>
          <nav className="space-y-1">
            <Link href="/settings" onClick={() => setSidebarOpen(false)} className={`flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold ${pathname === "/settings" ? "bg-brand-50 text-brand-600" : "text-muted hover:bg-canvas hover:text-ink"}`}>
              <Settings size={18} /> Settings
            </Link>
            <Link href="/help" onClick={() => setSidebarOpen(false)} className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-muted hover:bg-canvas hover:text-ink">
              <CircleHelp size={18} /> Help center
            </Link>
          </nav>
        </div>

        <div className="border-t border-line p-4">
          <div className="flex items-center gap-3 rounded-xl bg-canvas p-3">
            <Avatar initials="JD" className="bg-[#dceaff] text-brand-700" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-ink">Jordan Davis</p>
              <p className="truncate text-[11px] text-muted">Administrator</p>
            </div>
            <ChevronDown size={15} className="text-muted" />
          </div>
        </div>
      </aside>

      {sidebarOpen && <button aria-label="Close navigation overlay" className="fixed inset-0 z-30 bg-ink/20 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-20 flex h-[84px] items-center justify-between border-b border-line bg-white/90 px-5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-muted hover:bg-canvas lg:hidden" aria-label="Open navigation"><Menu size={21} /></button>
            <div className="hidden items-center gap-2 rounded-xl bg-canvas px-3 sm:flex sm:w-[260px]">
              <Search size={16} className="text-muted" />
              <input aria-label="Search" placeholder="Search anything..." className="h-10 w-full bg-transparent text-xs text-ink outline-none placeholder:text-[#a1aabc]" />
              <span className="rounded-md border border-line bg-white px-1.5 py-0.5 text-[10px] text-muted">⌘ K</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-xl p-2.5 text-muted hover:bg-canvas" aria-label="Notifications">
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-coral ring-2 ring-white" />
            </button>
            <div className="hidden h-6 w-px bg-line sm:block" />
            <div className="flex items-center gap-2.5">
              <Avatar initials="JD" className="h-8 w-8 bg-[#dceaff] text-brand-700" />
              <div className="hidden text-left sm:block">
                <p className="text-xs font-bold text-ink">Jordan Davis</p>
                <p className="text-[10px] text-muted">Admin account</p>
              </div>
              <ChevronDown size={14} className="hidden text-muted sm:block" />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}

