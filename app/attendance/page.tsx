"use client";

import { CalendarDays, Check, Download, Save, UsersRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { attendanceRows, type AttendanceStatus } from "@/lib/mock-data";
import { AppShell } from "@/components/app-shell";
import { Avatar, Button, Card, PageHeading } from "@/components/ui";
import { downloadCSV } from "@/lib/download";
import { getStorageItem, setStorageItem } from "@/lib/storage";

const statuses: AttendanceStatus[] = ["Present", "Absent", "Late", "Excused"];

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState("2026-10-29");
  const [selectedClass, setSelectedClass] = useState("Grade 8 · A");
  const [rows, setRows] = useState(attendanceRows);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [lastSaved, setLastSaved] = useState("today at 09:14 AM");

  useEffect(() => {
    const saved = getStorageItem<typeof attendanceRows>("lumen_attendance", attendanceRows);
    if (saved && saved.length > 0) {
      setRows(saved);
    }
    const savedTime = getStorageItem<string>("lumen_attendance_time", "today at 09:14 AM");
    if (savedTime) {
      setLastSaved(savedTime);
    }
  }, []);

  const setStatus = (id: string, status: AttendanceStatus) => {
    setSaveStatus("idle");
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, today: status } : row))
    );
  };

  const markAll = (status: AttendanceStatus) => {
    if (!status) return;
    setSaveStatus("idle");
    setRows((current) => current.map((row) => ({ ...row, today: status })));
  };

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const savedTimestamp = `today at ${timeStr}`;
      setLastSaved(savedTimestamp);
      setStorageItem("lumen_attendance", rows);
      setStorageItem("lumen_attendance_time", savedTimestamp);
      setSaveStatus("saved");
    }, 400);
  };

  const handleExport = () => {
    const headers = ["Admission No", "Student Name", "Class", "Date", "Attendance Status"];
    const exportData = rows.map((r) => [
      r.admissionNumber,
      r.name,
      selectedClass,
      selectedDate,
      r.today,
    ]);
    downloadCSV(`attendance_${selectedClass.replace(/[^a-zA-Z0-9]/g, "_")}_${selectedDate}.csv`, headers, exportData);
  };

  const presentCount = rows.filter((r) => r.today === "Present" || r.today === "Late").length;
  const absentCount = rows.filter((r) => r.today === "Absent").length;
  const presentPct = Math.round((presentCount / (rows.length || 1)) * 100);

  return (
    <AppShell>
      <PageHeading
        eyebrow="Daily records"
        title="Attendance"
        description="Mark attendance quickly and keep a clear record of every school day."
        action={
          <Button variant="secondary" onClick={handleExport}>
            <Download size={16} /> Export
          </Button>
        }
      />

      {/* Summary Stats */}
      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-4 p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7f8f2] text-mint">
            <Check size={19} />
          </span>
          <div>
            <p className="text-xs text-muted">Present in {selectedClass}</p>
            <p className="mt-1 text-xl font-bold text-ink">
              {presentCount} <span className="text-xs font-semibold text-mint">{presentPct}%</span>
            </p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0f1] text-coral">
            <X size={19} />
          </span>
          <div>
            <p className="text-xs text-muted">Absent today</p>
            <p className="mt-1 text-xl font-bold text-ink">
              {absentCount} <span className="text-xs font-semibold text-coral">{100 - presentPct}%</span>
            </p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <UsersRound size={19} />
          </span>
          <div>
            <p className="text-xs text-muted">Classes marked</p>
            <p className="mt-1 text-xl font-bold text-ink">
              9 <span className="text-xs font-semibold text-muted">of 12</span>
            </p>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        {/* Controls */}
        <div className="flex flex-col gap-4 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-10 items-center gap-2 rounded-xl border border-line bg-canvas px-3 text-xs font-semibold text-ink">
              <CalendarDays size={15} className="text-muted" />
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="bg-transparent outline-none cursor-pointer"
              />
            </div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="h-10 rounded-xl border border-line bg-white px-3 text-xs font-semibold text-ink outline-none cursor-pointer"
            >
              <option>Grade 8 · A</option>
              <option>Grade 8 · B</option>
              <option>Grade 7 · A</option>
              <option>Grade 6 · A</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-muted">Mark all as:</span>
            <select
              onChange={(event) => markAll(event.target.value as AttendanceStatus)}
              className="h-9 rounded-lg border border-line px-2 text-xs font-semibold text-ink outline-none cursor-pointer"
            >
              <option value="">Choose status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table header */}
        <div className="hidden grid-cols-[1.4fr_1fr_1fr_260px] gap-4 border-b border-line bg-canvas px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a1aabc] sm:grid">
          <span>Student</span>
          <span>Admission no.</span>
          <span>Class</span>
          <span>Attendance status</span>
        </div>

        {/* Rows */}
        {rows.map((row) => (
          <div
            key={row.id}
            className="grid gap-3 border-b border-line px-5 py-4 last:border-0 sm:grid-cols-[1.4fr_1fr_1fr_260px] sm:items-center sm:gap-4 hover:bg-canvas/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Avatar initials={row.initials} className={row.accent} />
              <div>
                <p className="text-xs font-bold text-ink">{row.name}</p>
                <p className="mt-0.5 text-[11px] text-muted">{row.admissionNumber}</p>
              </div>
            </div>
            <span className="text-xs text-muted">{row.admissionNumber}</span>
            <span className="text-xs font-semibold text-ink">{row.className}</span>
            <div className="grid grid-cols-4 gap-1">
              {statuses.map((status) => {
                const isSelected = row.today === status;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatus(row.id, status)}
                    className={`rounded-lg py-2 text-[10px] font-bold transition-all ${
                      isSelected
                        ? status === "Present"
                          ? "bg-[#e7f8f2] text-mint ring-2 ring-mint/20"
                          : status === "Absent"
                          ? "bg-[#fff0f1] text-coral ring-2 ring-coral/20"
                          : status === "Late"
                          ? "bg-[#fff5dd] text-[#ad7c19] ring-2 ring-[#ad7c19]/20"
                          : "bg-brand-50 text-brand-600 ring-2 ring-brand-200"
                        : "bg-white text-muted hover:bg-canvas border border-line/60"
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Footer with working save and status */}
        <div className="flex flex-col gap-3 border-t border-line bg-canvas px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            {saveStatus === "saved" ? (
              <span className="inline-flex items-center gap-1 font-semibold text-mint">
                <Check size={14} /> Changes saved successfully!
              </span>
            ) : (
              <>
                Last saved <strong className="text-ink">{lastSaved}</strong>
              </>
            )}
          </p>
          <Button onClick={handleSave} disabled={saveStatus === "saving"}>
            <Save size={15} />
            {saveStatus === "saving" ? "Saving..." : "Save attendance"}
          </Button>
        </div>
      </Card>
    </AppShell>
  );
}
