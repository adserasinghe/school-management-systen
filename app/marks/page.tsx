"use client";

import { Check, Download, Save, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { students } from "@/lib/mock-data";
import { AppShell } from "@/components/app-shell";
import { Avatar, Badge, Button, Card, PageHeading } from "@/components/ui";
import { downloadCSV } from "@/lib/download";
import { getStorageItem, setStorageItem } from "@/lib/storage";

const initialMarks: Record<string, string> = {
  "1": "84",
  "2": "76",
  "3": "91",
  "4": "68",
  "5": "88",
  "6": "59",
};

export default function MarksPage() {
  const [selectedExam, setSelectedExam] = useState("Term 1 examination");
  const [selectedClass, setSelectedClass] = useState("Grade 8 · A");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");

  const [marks, setMarks] = useState<Record<string, string>>(initialMarks);
  const [status, setStatus] = useState<"Draft" | "Published">("Draft");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    const saved = getStorageItem<Record<string, string>>("lumen_marks", initialMarks);
    if (saved) setMarks(saved);
    const savedStatus = getStorageItem<"Draft" | "Published">("lumen_marks_status", "Draft");
    if (savedStatus) setStatus(savedStatus);
  }, []);

  const calculateGrade = (value: string) => {
    const percentage = Number(value);
    if (Number.isNaN(percentage) || value === "") return "-";
    if (percentage >= 75) return "A";
    if (percentage >= 65) return "B";
    if (percentage >= 55) return "C";
    if (percentage >= 40) return "S";
    return "F";
  };

  const handleSaveDraft = () => {
    setStatus("Draft");
    setStorageItem("lumen_marks", marks);
    setStorageItem("lumen_marks_status", "Draft");
    setSaveMessage("Draft saved just now");
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handlePublish = () => {
    setStatus("Published");
    setStorageItem("lumen_marks", marks);
    setStorageItem("lumen_marks_status", "Published");
    setSaveMessage("Marks published successfully for this class");
    setTimeout(() => setSaveMessage(null), 3500);
  };

  const handleExport = () => {
    const headers = ["Admission No", "Student Name", "Class", "Exam", "Subject", "Score / 100", "Grade"];
    const rows = students.slice(0, 6).map((student) => [
      student.admissionNumber,
      student.name,
      selectedClass,
      selectedExam,
      selectedSubject,
      marks[student.id] ?? "0",
      calculateGrade(marks[student.id] ?? ""),
    ]);
    downloadCSV(
      `marks_${selectedSubject.toLowerCase()}_${selectedClass.replace(/[^a-zA-Z0-9]/g, "_")}.csv`,
      headers,
      rows
    );
  };

  return (
    <AppShell>
      <PageHeading
        eyebrow="Assessment workspace"
        title="Marks & exams"
        description="Enter, review, and publish marks for every subject and exam."
        action={
          <Button variant="secondary" onClick={handleExport}>
            <Download size={16} /> Export marks
          </Button>
        }
      />

      {/* Selectors */}
      <Card className="mb-5 p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">Exam</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="h-10 w-full rounded-xl border border-line bg-white px-3 text-xs font-semibold text-ink outline-none cursor-pointer focus:border-brand-500"
            >
              <option>Term 1 examination</option>
              <option>Term 2 examination</option>
              <option>Mid-term test</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="h-10 w-full rounded-xl border border-line bg-white px-3 text-xs font-semibold text-ink outline-none cursor-pointer focus:border-brand-500"
            >
              <option>Grade 8 · A</option>
              <option>Grade 8 · B</option>
              <option>Grade 7 · A</option>
              <option>Grade 6 · A</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="h-10 w-full rounded-xl border border-line bg-white px-3 text-xs font-semibold text-ink outline-none cursor-pointer focus:border-brand-500"
            >
              <option>Mathematics</option>
              <option>English Language</option>
              <option>Integrated Science</option>
              <option>Social Studies</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-line p-5">
          <div>
            <h2 className="text-sm font-bold text-ink">
              {selectedSubject} · {selectedExam}
            </h2>
            <p className="mt-1 text-xs text-muted">
              {selectedClass} · Maximum marks: 100
            </p>
          </div>
          <Badge tone={status === "Published" ? "green" : "amber"}>{status}</Badge>
        </div>

        <div className="hidden grid-cols-[1.5fr_1fr_180px_100px_80px] gap-4 border-b border-line bg-canvas px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a1aabc] sm:grid">
          <span>Student</span>
          <span>Admission no.</span>
          <span>Marks obtained</span>
          <span>Grade</span>
          <span>Status</span>
        </div>

        {students.slice(0, 6).map((student) => {
          const currentMark = marks[student.id] ?? "";
          const studentGrade = calculateGrade(currentMark);
          return (
            <div
              key={student.id}
              className="grid gap-3 border-b border-line px-5 py-4 last:border-0 sm:grid-cols-[1.5fr_1fr_180px_100px_80px] sm:items-center sm:gap-4 hover:bg-canvas/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar initials={student.initials} className={student.accent} />
                <span className="text-xs font-bold text-ink">{student.name}</span>
              </div>
              <span className="text-xs text-muted">{student.admissionNumber}</span>
              <div className="flex items-center gap-2">
                <input
                  aria-label={`Marks for ${student.name}`}
                  value={currentMark}
                  onChange={(event) => {
                    const val = event.target.value.replace(/[^0-9]/g, "");
                    if (Number(val) > 100) return;
                    setMarks((current) => ({
                      ...current,
                      [student.id]: val,
                    }));
                  }}
                  className="h-10 w-24 rounded-xl border border-line px-3 text-center text-sm font-bold text-ink outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
                />
                <span className="text-xs text-muted">/ 100</span>
              </div>
              <span
                className={`text-sm font-bold ${
                  studentGrade === "F" ? "text-coral" : "text-ink"
                }`}
              >
                {studentGrade}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-mint">
                <Check size={14} /> Ready
              </span>
            </div>
          );
        })}

        <div className="flex flex-col gap-3 border-t border-line bg-canvas px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            {saveMessage ? (
              <span className="font-semibold text-mint">{saveMessage}</span>
            ) : status === "Published" ? (
              <span className="font-semibold text-mint">Published to report cards</span>
            ) : (
              "Changes are saved as a draft until published."
            )}
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleSaveDraft}>
              <Save size={15} /> Save draft
            </Button>
            <Button onClick={handlePublish}>
              <Send size={15} /> Publish marks
            </Button>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}
