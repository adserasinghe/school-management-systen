"use client";

import { Bell, Building2, Check, ChevronDown, LockKeyhole, Save, UserRound } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button, Card, PageHeading } from "@/components/ui";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  return (
    <AppShell>
      <PageHeading eyebrow="Workspace" title="Settings" description="Keep your school profile, preferences, and access controls up to date." />
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-2 overflow-auto lg:block lg:space-y-1">
          {[{ icon: Building2, label: "School profile" }, { icon: UserRound, label: "My account" }, { icon: Bell, label: "Notifications" }, { icon: LockKeyhole, label: "Security" }].map((item, index) => { const Icon = item.icon; return <button key={item.label} className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-bold lg:w-full ${index === 0 ? "bg-brand-50 text-brand-600" : "text-muted hover:bg-canvas"}`}><Icon size={16} />{item.label}</button> })}</nav>
        <div className="space-y-6">
          <Card className="overflow-hidden"><div className="border-b border-line p-5"><h2 className="text-sm font-bold text-ink">School profile</h2><p className="mt-1 text-xs text-muted">This information appears on reports and communications.</p></div><div className="grid gap-4 p-5 sm:grid-cols-2"><label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">School name</span><input defaultValue="Northstar Academy" className="h-10 w-full rounded-xl border border-line px-3 text-xs font-semibold text-ink outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50" /></label><label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">Academic year</span><select className="h-10 w-full rounded-xl border border-line bg-white px-3 text-xs font-semibold text-ink outline-none"><option>2026 / 2027</option></select></label><label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">School email</span><input defaultValue="hello@northstar.edu" type="email" className="h-10 w-full rounded-xl border border-line px-3 text-xs font-semibold text-ink outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50" /></label><label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">Phone number</span><input defaultValue="+1 202 555 0100" className="h-10 w-full rounded-xl border border-line px-3 text-xs font-semibold text-ink outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50" /></label><label className="sm:col-span-2"><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">Address</span><input defaultValue="24 Northstar Avenue, Washington DC" className="h-10 w-full rounded-xl border border-line px-3 text-xs font-semibold text-ink outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50" /></label></div><div className="flex justify-end border-t border-line bg-canvas p-4"><Button onClick={() => setSaved(true)}>{saved ? <><Check size={15} /> Saved</> : <><Save size={15} /> Save changes</>}</Button></div></Card>
          <Card className="overflow-hidden"><div className="border-b border-line p-5"><h2 className="text-sm font-bold text-ink">Grading scale</h2><p className="mt-1 text-xs text-muted">Configure the percentage thresholds used to calculate grades.</p></div><div className="divide-y divide-line">{[{ grade: "A", from: "75", color: "bg-brand-500" }, { grade: "B", from: "65", color: "bg-mint" }, { grade: "C", from: "55", color: "bg-amber" }, { grade: "S", from: "40", color: "bg-[#9579db]" }, { grade: "F", from: "0", color: "bg-coral" }].map((item) => <div className="flex items-center gap-4 px-5 py-3" key={item.grade}><span className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.color} text-xs font-bold text-white`}>{item.grade}</span><span className="flex-1 text-xs font-semibold text-ink">{item.grade === "F" ? "Below" : "From"} <strong>{item.from}%</strong></span><button aria-label={`Edit ${item.grade} threshold`} className="text-muted"><ChevronDown size={16} /></button></div>)}</div></Card>
        </div>
      </div>
    </AppShell>
  );
}

