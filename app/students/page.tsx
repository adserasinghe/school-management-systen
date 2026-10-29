"use client";

import { Download, Filter, MoreHorizontal, Plus, Search, SlidersHorizontal, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { students, type StudentStatus } from "@/lib/mock-data";
import { AppShell } from "@/components/app-shell";
import { Avatar, Badge, Button, Card, PageHeading, ProgressBar } from "@/components/ui";

const statusTone: Record<StudentStatus, "green" | "gray" | "purple"> = { Active: "green", Inactive: "gray", Graduated: "purple" };

export default function StudentsPage() {
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All classes");
  const filtered = useMemo(() => students.filter((student) => {
    const matchesQuery = `${student.name} ${student.admissionNumber}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (classFilter === "All classes" || student.className.includes(classFilter));
  }), [classFilter, query]);

  return (
    <AppShell>
      <PageHeading eyebrow="Directory" title="Students" description="Manage student profiles, enrollment, and academic progress." action={<Button><Plus size={16} /> Add student</Button>} />
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <Card className="p-4"><p className="text-xs font-semibold text-muted">Total students</p><p className="mt-1 text-2xl font-bold text-ink">168</p><p className="mt-1 text-[11px] font-semibold text-mint">+8 this term</p></Card>
        <Card className="p-4"><p className="text-xs font-semibold text-muted">Active enrollment</p><p className="mt-1 text-2xl font-bold text-ink">161</p><p className="mt-1 text-[11px] font-semibold text-brand-600">95.8% of total</p></Card>
        <Card className="p-4"><p className="text-xs font-semibold text-muted">Average attendance</p><p className="mt-1 text-2xl font-bold text-ink">92.6%</p><p className="mt-1 text-[11px] font-semibold text-mint">+2.1% this month</p></Card>
      </div>
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-canvas px-3 sm:max-w-[300px]"><Search size={16} className="text-muted" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search students..." className="h-10 w-full bg-transparent text-xs outline-none placeholder:text-[#a1aabc]" /></div>
          <div className="flex gap-2">
            <select value={classFilter} onChange={(event) => setClassFilter(event.target.value)} className="h-10 rounded-xl border border-line bg-white px-3 text-xs font-semibold text-muted outline-none"><option>All classes</option><option>Grade 8</option><option>Grade 7</option><option>Grade 6</option></select>
            <Button variant="secondary" className="h-10 px-3"><SlidersHorizontal size={15} /><span className="hidden sm:inline">Filters</span></Button>
            <Button variant="secondary" className="h-10 px-3"><Download size={15} /><span className="hidden sm:inline">Export</span></Button>
          </div>
        </div>
        <div className="hidden grid-cols-[1.6fr_1fr_1.2fr_1fr_90px_30px] gap-4 border-b border-line bg-canvas px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a1aabc] lg:grid"><span>Student</span><span>Admission no.</span><span>Class</span><span>Attendance</span><span>Status</span><span /></div>
        {filtered.map((student) => (
          <div key={student.id} className="grid gap-3 border-b border-line px-4 py-4 last:border-0 sm:px-5 lg:grid-cols-[1.6fr_1fr_1.2fr_1fr_90px_30px] lg:items-center lg:gap-4">
            <div className="flex items-center gap-3"><Avatar initials={student.initials} className={student.accent} /><div><p className="text-xs font-bold text-ink">{student.name}</p><p className="mt-0.5 text-[11px] text-muted">{student.guardian}</p></div></div>
            <span className="text-xs text-muted">{student.admissionNumber}</span>
            <span className="text-xs font-semibold text-ink">{student.className}</span>
            <div><div className="mb-1 flex justify-between text-[11px]"><span className="text-muted lg:hidden">Attendance</span><span className={`font-bold ${student.attendance < 85 ? "text-coral" : "text-ink"}`}>{student.attendance}%</span></div><ProgressBar value={student.attendance} color={student.attendance < 85 ? "bg-coral" : "bg-mint"} /></div>
            <Badge tone={statusTone[student.status]}>{student.status}</Badge>
            <button aria-label={`More options for ${student.name}`} className="hidden text-muted lg:block"><MoreHorizontal size={17} /></button>
          </div>
        ))}
        {filtered.length === 0 && <div className="p-12 text-center text-sm text-muted">No students matched your search.</div>}
        <div className="flex flex-col gap-3 border-t border-line px-5 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between"><span>Showing <strong className="text-ink">{filtered.length}</strong> of 168 students</span><div className="flex gap-1"><button className="h-8 rounded-lg border border-line px-3 font-semibold text-muted">Previous</button><button className="h-8 rounded-lg bg-brand-500 px-3 font-semibold text-white">1</button><button className="h-8 rounded-lg border border-line px-3 font-semibold text-muted">2</button><button className="h-8 rounded-lg border border-line px-3 font-semibold text-muted">Next</button></div></div>
      </Card>
    </AppShell>
  );
}

