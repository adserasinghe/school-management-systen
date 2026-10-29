"use client";

import { CalendarDays, Check, ChevronDown, Download, Save, UsersRound, X } from "lucide-react";
import { useState } from "react";
import { attendanceRows, type AttendanceStatus } from "@/lib/mock-data";
import { AppShell } from "@/components/app-shell";
import { Avatar, Badge, Button, Card, PageHeading } from "@/components/ui";

const statuses: AttendanceStatus[] = ["Present", "Absent", "Late", "Excused"];

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState("2026-10-29");
  const [rows, setRows] = useState(attendanceRows);
  const setStatus = (id: string, status: AttendanceStatus) => setRows((current) => current.map((row) => row.id === id ? { ...row, today: status } : row));
  const markAll = (status: AttendanceStatus) => setRows((current) => current.map((row) => ({ ...row, today: status })));
  return (
    <AppShell>
      <PageHeading eyebrow="Daily records" title="Attendance" description="Mark attendance quickly and keep a clear record of every school day." action={<Button variant="secondary"><Download size={16} /> Export</Button>} />
      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-4 p-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7f8f2] text-mint"><Check size={19} /></span><div><p className="text-xs text-muted">Present today</p><p className="mt-1 text-xl font-bold text-ink">156 <span className="text-xs font-semibold text-mint">92.6%</span></p></div></Card>
        <Card className="flex items-center gap-4 p-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0f1] text-coral"><X size={19} /></span><div><p className="text-xs text-muted">Absent today</p><p className="mt-1 text-xl font-bold text-ink">8 <span className="text-xs font-semibold text-coral">4.8%</span></p></div></Card>
        <Card className="flex items-center gap-4 p-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><UsersRound size={19} /></span><div><p className="text-xs text-muted">Classes marked</p><p className="mt-1 text-xl font-bold text-ink">8 <span className="text-xs font-semibold text-muted">of 12</span></p></div></Card>
      </div>
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <label className="flex h-10 items-center gap-2 rounded-xl border border-line px-3 text-xs font-semibold text-muted"><CalendarDays size={15} /><input type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} className="bg-transparent outline-none" /></label>
            <button className="flex h-10 items-center gap-2 rounded-xl border border-line px-3 text-xs font-semibold text-ink">Grade 8 · A <ChevronDown size={14} className="text-muted" /></button>
          </div>
          <div className="flex items-center gap-2"><span className="text-[11px] text-muted">Mark all as</span><select onChange={(event) => markAll(event.target.value as AttendanceStatus)} className="h-9 rounded-lg border border-line px-2 text-xs font-semibold text-ink outline-none"><option value="">Choose status</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div>
        </div>
        <div className="hidden grid-cols-[1.4fr_1fr_1fr_260px] gap-4 border-b border-line bg-canvas px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a1aabc] sm:grid"><span>Student</span><span>Admission no.</span><span>Class</span><span>Attendance status</span></div>
        {rows.map((row) => (
          <div key={row.id} className="grid gap-3 border-b border-line px-5 py-4 last:border-0 sm:grid-cols-[1.4fr_1fr_1fr_260px] sm:items-center sm:gap-4">
            <div className="flex items-center gap-3"><Avatar initials={row.initials} className={row.accent} /><div><p className="text-xs font-bold text-ink">{row.name}</p><p className="mt-0.5 text-[11px] text-muted">{row.admissionNumber}</p></div></div>
            <span className="text-xs text-muted">{row.admissionNumber}</span><span className="text-xs font-semibold text-ink">{row.className}</span>
            <div className="grid grid-cols-4 gap-1">{statuses.map((status) => <button key={status} onClick={() => setStatus(row.id, status)} className={`rounded-lg py-2 text-[10px] font-bold transition-colors ${row.today === status ? status === "Present" ? "bg-[#e7f8f2] text-mint" : status === "Absent" ? "bg-[#fff0f1] text-coral" : status === "Late" ? "bg-[#fff5dd] text-[#ad7c19]" : "bg-brand-50 text-brand-600" : "bg-white text-muted hover:bg-canvas"}`}>{status}</button>)}</div>
          </div>
        ))}
        <div className="flex flex-col gap-3 border-t border-line bg-canvas px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-muted">Last saved <strong className="text-ink">today at 09:14 AM</strong></p><Button><Save size={15} /> Save attendance</Button></div>
      </Card>
    </AppShell>
  );
}

