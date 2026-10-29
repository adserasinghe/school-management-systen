import { ArrowUpRight, CircleHelp, FileQuestion, MessageCircle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, PageHeading } from "@/components/ui";

export default function HelpPage() {
  return <AppShell><PageHeading eyebrow="Support" title="Help center" description="Find answers or get in touch with the Lumen team." /><div className="grid gap-5 md:grid-cols-3">{[{ icon: FileQuestion, title: "Getting started", detail: "Learn the basics of setting up your school workspace." }, { icon: CircleHelp, title: "Common questions", detail: "Quick answers about attendance, marks, and reports." }, { icon: MessageCircle, title: "Contact support", detail: "Our team is here when you need a hand." }].map((item) => { const Icon = item.icon; return <Card className="group p-5 transition-colors hover:border-brand-100 hover:bg-brand-50" key={item.title}><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-canvas text-brand-600 group-hover:bg-white"><Icon size={19} /></span><h2 className="mt-5 text-sm font-bold text-ink">{item.title}</h2><p className="mt-2 text-xs leading-5 text-muted">{item.detail}</p><span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-brand-600">Explore <ArrowUpRight size={14} /></span></Card> })}</div></AppShell>;
}

