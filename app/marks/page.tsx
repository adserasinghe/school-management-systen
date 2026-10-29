"use client";

import { Check, ChevronDown, Download, Save } from "lucide-react";
import { useState } from "react";
import { students } from "@/lib/mock-data";
import { AppShell } from "@/components/app-shell";
import { Avatar, Badge, Button, Card, PageHeading } from "@/components/ui";

export default function MarksPage() {
  const [marks, setMarks] = useState<Record<string, string>>({ "1": "84", "2": "76", "3": "91", "4": "68", "5": "88", "6": "59" });
  const [saved, setSaved] = useState(false);
  const grade = (value: string) => { const percentage = Number(value); return Number.isNaN(percentage) ? "-" : percentage >= 75 ? "A" : percentage >= 65 ? "B" : percentage >= 55 ? "C" : percentage >= 40 ? "S" : "F"; };
  return (
    <AppShell>
      <PageHeading eyebrow="Assessment workspace" title="Marks & exams" description="Enter, review, and publish marks for every subject and exam." action={<Button variant="secondary"><Download size={16} /> Export marks</Button>} />
      <Card className="mb-5 p-4 sm:p-5"><div className="grid gap-3 md:grid-cols-3"><label className="block"><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">Exam</span><span className="flex h-10 items-center justify-between rounded-xl border border-line px-3 text-xs font-semibold text-ink">Term 1 examination <ChevronDown size={14} className="text-muted" /></span></label><label className="block"><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">Class</span><span className="flex h-10 items-center justify-between rounded-xl border border-line px-3 text-xs font-semibold text-ink">Grade 8 · A <ChevronDown size={14} className="text-muted" /></span></label><label className="block"><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">Subject</span><span className="flex h-10 items-center justify-between rounded-xl border border-line px-3 text-xs font-semibold text-ink">Mathematics <ChevronDown size={14} className="text-muted" /></span></label></div></Card>
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-line p-5"><div><h2 className="text-sm font-bold text-ink">Mathematics · Term 1</h2><p className="mt-1 text-xs text-muted">Grade 8 · A · Maximum marks: 100</p></div><Badge tone="amber">Draft</Badge></div>
        <div className="hidden grid-cols-[1.5fr_1fr_180px_100px_80px] gap-4 border-b border-line bg-canvas px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a1aabc] sm:grid"><span>Student</span><span>Admission no.</span><span>Marks obtained</span><span>Grade</span><span>Status</span></div>
        {students.slice(0, 6).map((student) => <div key={student.id} className="grid gap-3 border-b border-line px-5 py-4 last:border-0 sm:grid-cols-[1.5fr_1fr_180px_100px_80px] sm:items-center sm:gap-4"><div className="flex items-center gap-3"><Avatar initials={student.initials} className={student.accent} /><span className="text-xs font-bold text-ink">{student.name}</span></div><span className="text-xs text-muted">{student.admissionNumber}</span><div className="flex items-center gap-2"><input aria-label={`Marks for ${student.name}`} value={marks[student.id] ?? ""} onChange={(event) => { setSaved(false); setMarks((current) => ({ ...current, [student.id]: event.target.value.replace(/[^0-9.]/g, "") })); }} className="h-10 w-24 rounded-xl border border-line px-3 text-center text-sm font-bold text-ink outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50" /><span className="text-xs text-muted">/ 100</span></div><span className={`text-sm font-bold ${grade(marks[student.id]) === "F" ? "text-coral" : "text-ink"}`}>{grade(marks[student.id])}</span><span className="flex items-center gap-1 text-[11px] font-semibold text-mint"><Check size={14} /> Ready</span></div>)}
        <div className="flex flex-col gap-3 border-t border-line bg-canvas px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-muted">{saved ? <span className="font-semibold text-mint">All changes saved just now</span> : "Changes are saved as a draft until published."}</p><div className="flex gap-2"><Button variant="secondary">Save draft</Button><Button onClick={() => setSaved(true)}><Save size={15} /> Publish marks</Button></div></div>
      </Card>
    </AppShell>
  );
}

