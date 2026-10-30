"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, type ReactNode } from "react";
import {
  BarChart3,
  Bell,
  BookOpen,
  CalendarCheck2,
  Check,
  ChevronDown,
  CircleHelp,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  SquareStack,
  UsersRound,
  X,
} from "lucide-react";
import { Avatar, Modal } from "./ui";

const navigation = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Students", href: "/students", icon: UsersRound },
  { label: "Classes & subjects", href: "/classes", icon: SquareStack },
  { label: "Attendance", href: "/attendance", icon: CalendarCheck2 },
  { label: "Marks & exams", href: "/marks", icon: BookOpen },
  { label: "Reports", href: "/reports", icon: BarChart3 },
];

const initialNotifications = [
  { id: "1", title: "Attendance recorded", desc: "Grade 8 · A attendance was marked today.", time: "10m ago", read: false },
  { id: "2", title: "Term 1 marks pending", desc: "Science marks need review before publishing.", time: "1h ago", read: false },
  { id: "3", title: "New student enrolled", desc: "Sofia Martinez joined Grade 8 · A.", time: "3h ago", read: true },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const searchResults = [
    { title: "Dashboard Overview", type: "Page", href: "/dashboard", icon: LayoutDashboard },
    { title: "Student Directory", type: "Page", href: "/students", icon: UsersRound },
    { title: "Classes & Subjects", type: "Page", href: "/classes", icon: SquareStack },
    { title: "Attendance Records", type: "Page", href: "/attendance", icon: CalendarCheck2 },
    { title: "Marks & Assessments", type: "Page", href: "/marks", icon: BookOpen },
    { title: "Reports & Analytics", type: "Page", href: "/reports", icon: BarChart3 },
    { title: "School Settings", type: "Page", href: "/settings", icon: Settings },
    { title: "Help & FAQ", type: "Page", href: "/help", icon: CircleHelp },
    { title: "Amara Okafor (STU-2401)", type: "Student", href: "/students", icon: UsersRound },
    { title: "Lucas Bennett (STU-2402)", type: "Student", href: "/students", icon: UsersRound },
    { title: "Grade 8 · A", type: "Class", href: "/classes", icon: SquareStack },
    { title: "Mathematics (MATH-08)", type: "Subject", href: "/classes", icon: BookOpen },
  ].filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-canvas">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-line bg-white transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[84px] items-center justify-between border-b border-line px-6">
          <Link href="/dashboard" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-lg font-black text-white">L</span>
            <span>
              <span className="block text-[17px] font-extrabold tracking-[-0.04em] text-ink">lumen</span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-muted">school OS</span>
            </span>
          </Link>
          <button className="text-muted hover:text-ink lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#a1aabc]">Workspace</p>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const active = pathname ? (pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))) : item.href === "/dashboard";
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors ${active ? "bg-brand-50 text-brand-600 font-bold" : "text-muted hover:bg-canvas hover:text-ink"}`}
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
            <Link href="/settings" onClick={() => setSidebarOpen(false)} className={`flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold ${pathname === "/settings" ? "bg-brand-50 text-brand-600 font-bold" : "text-muted hover:bg-canvas hover:text-ink"}`}>
              <Settings size={18} /> Settings
            </Link>
            <Link href="/help" onClick={() => setSidebarOpen(false)} className={`flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold ${pathname === "/help" ? "bg-brand-50 text-brand-600 font-bold" : "text-muted hover:bg-canvas hover:text-ink"}`}>
              <CircleHelp size={18} /> Help center
            </Link>
          </nav>
        </div>

        <div className="relative border-t border-line p-4">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex w-full items-center gap-3 rounded-xl bg-canvas p-3 text-left transition-colors hover:bg-slate-100"
          >
            <Avatar initials="JD" className="bg-[#dceaff] text-brand-700" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-ink">Jordan Davis</p>
              <p className="truncate text-[11px] text-muted">Administrator</p>
            </div>
            <ChevronDown size={15} className={`text-muted transition-transform ${profileOpen ? "rotate-180" : ""}`} />
          </button>
          {profileOpen && (
            <div className="absolute bottom-[80px] left-4 right-4 z-50 rounded-xl border border-line bg-white p-2 shadow-lg animate-in fade-in zoom-in-95">
              <Link href="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-ink hover:bg-canvas">
                <Settings size={14} className="text-muted" /> Settings
              </Link>
              <Link href="/help" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-ink hover:bg-canvas">
                <CircleHelp size={14} className="text-muted" /> Help center
              </Link>
              <div className="my-1 border-t border-line" />
              <Link href="/login" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-coral hover:bg-[#fff0f1]">
                <LogOut size={14} /> Sign out
              </Link>
            </div>
          )}
        </div>
      </aside>

      {sidebarOpen && <button aria-label="Close navigation overlay" className="fixed inset-0 z-30 bg-ink/20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="lg:pl-[248px]">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-[84px] items-center justify-between border-b border-line bg-white/90 px-5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-muted hover:bg-canvas lg:hidden" aria-label="Open navigation"><Menu size={21} /></button>
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden items-center gap-2 rounded-xl bg-canvas px-3 py-2 text-left sm:flex sm:w-[260px] hover:ring-2 hover:ring-brand-100 transition-all"
            >
              <Search size={16} className="text-muted" />
              <span className="flex-1 text-xs text-muted">Search anything...</span>
              <span className="rounded-md border border-line bg-white px-1.5 py-0.5 text-[10px] font-semibold text-muted">⌘ K</span>
            </button>
          </div>
          <div className="relative flex items-center gap-3">
            <button
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
              className="relative rounded-xl p-2.5 text-muted hover:bg-canvas hover:text-ink transition-colors"
              aria-label="Notifications"
            >
              <Bell size={19} />
              {unreadCount > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-coral ring-2 ring-white" />}
            </button>

            {/* Notifications Popover */}
            {notifOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-line bg-white p-4 shadow-xl animate-in fade-in zoom-in-95">
                <div className="mb-3 flex items-center justify-between border-b border-line pb-2.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-ink">Notifications</h3>
                    {unreadCount > 0 && <span className="rounded-full bg-[#fff0f1] px-2 py-0.5 text-[10px] font-bold text-coral">{unreadCount} new</span>}
                  </div>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-[11px] font-semibold text-brand-600 hover:underline">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="space-y-2.5 max-h-[320px] overflow-y-auto">
                  {notifications.map((item) => (
                    <div key={item.id} className={`rounded-xl p-3 transition-colors ${item.read ? "bg-white" : "bg-brand-50/60"}`}>
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-ink">{item.title}</p>
                        <span className="text-[10px] text-muted">{item.time}</span>
                      </div>
                      <p className="mt-1 text-[11px] text-muted leading-tight">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="hidden h-6 w-px bg-line sm:block" />

            <div className="relative">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                className="flex items-center gap-2.5 rounded-xl p-1.5 hover:bg-canvas transition-colors"
              >
                <Avatar initials="JD" className="h-8 w-8 bg-[#dceaff] text-brand-700" />
                <div className="hidden text-left sm:block">
                  <p className="text-xs font-bold text-ink">Jordan Davis</p>
                  <p className="text-[10px] text-muted">Admin account</p>
                </div>
                <ChevronDown size={14} className="hidden text-muted sm:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 z-50 w-48 rounded-2xl border border-line bg-white p-2 shadow-xl animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-line mb-1">
                    <p className="text-xs font-bold text-ink">Jordan Davis</p>
                    <p className="text-[10px] text-muted">jordan@northstar.edu</p>
                  </div>
                  <Link href="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-ink hover:bg-canvas">
                    <Settings size={14} className="text-muted" /> Settings
                  </Link>
                  <Link href="/help" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-ink hover:bg-canvas">
                    <CircleHelp size={14} className="text-muted" /> Help center
                  </Link>
                  <div className="my-1 border-t border-line" />
                  <Link href="/login" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-coral hover:bg-[#fff0f1]">
                    <LogOut size={14} /> Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Command Palette Modal */}
        <Modal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          title="Command Palette"
          description="Quickly navigate or find students and classes"
        >
          <div className="mt-2">
            <div className="flex items-center gap-2.5 rounded-xl border border-line bg-canvas px-3.5 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-50">
              <Search size={16} className="text-muted" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type a page, student, or subject name..."
                className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-muted hover:text-ink"><X size={15} /></button>
              )}
            </div>
            <div className="mt-4 max-h-[300px] overflow-y-auto space-y-1">
              {searchResults.length === 0 ? (
                <p className="py-6 text-center text-xs text-muted">No results found for &quot;{searchQuery}&quot;</p>
              ) : (
                searchResults.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchOpen(false);
                        router.push(item.href);
                      }}
                      className="flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-colors hover:bg-canvas"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-canvas text-brand-600">
                          <Icon size={16} />
                        </span>
                        <div>
                          <p className="text-xs font-bold text-ink">{item.title}</p>
                          <span className="text-[10px] text-muted">{item.type}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-brand-600">Jump to →</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </Modal>

        <main className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
