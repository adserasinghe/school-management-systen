"use client";

import { BarChart3, CalendarDays, Check, Download, FileText, Printer, Trophy } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button, Card, Modal, PageHeading, ProgressBar } from "@/components/ui";
import { classes } from "@/lib/mock-data";
import { downloadCSV } from "@/lib/download";

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("Student report card");
  const [academicYear, setAcademicYear] = useState("2026 / 2027");
  const [reportFormat, setReportFormat] = useState("CSV file");
  const [generating, setGenerating] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const reportTypes = [
    { title: "Student report card", detail: "Marks, grades & attendance", icon: FileText },
    { title: "Attendance analysis", detail: "Class or student trends", icon: CalendarDays },
    { title: "Class ranking", detail: "Term performance ranking", icon: Trophy },
    { title: "Subject averages", detail: "Compare subject results", icon: BarChart3 },
  ];

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      const safeTitle = selectedReport.toLowerCase().replace(/[^a-zA-Z0-9]/g, "_");
      if (reportFormat === "CSV file" || reportFormat === "Excel spreadsheet") {
        const headers = ["Rank", "Class", "Section", "Teacher", "Average %", "Attendance %"];
        const rows = classes.map((c, idx) => [
          idx + 1,
          c.name,
          c.section,
          c.teacher,
          [84, 81, 78, 76, 73, 70][idx] ?? 75,
          c.attendance,
        ]);
        downloadCSV(`${safeTitle}_${academicYear.replace(/[^0-9]/g, "")}.csv`, headers, rows);
      } else {
        window.print();
      }
      setDownloadSuccess(`Generated ${selectedReport} (${reportFormat})`);
      setTimeout(() => setDownloadSuccess(null), 3500);
    }, 500);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const downloadPublishedReport = (title: string) => {
    const safeTitle = title.toLowerCase().replace(/[^a-zA-Z0-9]/g, "_");
    const headers = ["Student Name", "Class", "Score", "Grade", "Status"];
    const rows = [
      ["Amara Okafor", "Grade 8 · A", 96, "A", "Passed"],
      ["Lucas Bennett", "Grade 8 · A", 91, "A", "Passed"],
      ["Maya Chen", "Grade 8 · B", 88, "A", "Passed"],
      ["Noah Williams", "Grade 7 · A", 84, "A", "Passed"],
    ];
    downloadCSV(`${safeTitle}.csv`, headers, rows);
    setDownloadSuccess(`Downloaded ${title}`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <AppShell>
      <PageHeading
        eyebrow="Insights & exports"
        title="Reports"
        description="Turn daily records into a clear view of student progress."
        action={
          <Button variant="secondary" onClick={() => handleGenerate()}>
            <Download size={16} /> Export center
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: FileText, label: "Report cards", value: "168", detail: "Ready to publish", color: "bg-brand-50 text-brand-600" },
          { icon: CalendarDays, label: "Attendance report", value: "92.6%", detail: "School average", color: "bg-[#e7f8f2] text-mint" },
          { icon: Trophy, label: "Top class", value: "Grade 7 A", detail: "88.4% average", color: "bg-[#fff5dd] text-[#bd841e]" },
          { icon: BarChart3, label: "Subject average", value: "78.4%", detail: "Across 24 subjects", color: "bg-[#f3edff] text-[#7954b6]" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card className="p-5" key={item.label}>
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                <Icon size={19} />
              </span>
              <p className="mt-5 text-xs font-semibold text-muted">{item.label}</p>
              <p className="mt-1 text-2xl font-bold tracking-[-0.04em] text-ink">{item.value}</p>
              <p className="mt-1 text-[11px] text-muted">{item.detail}</p>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_1fr]">
        {/* Generate Report Generator */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line p-5">
            <div>
              <h2 className="text-sm font-bold text-ink">Generate a report</h2>
              <p className="mt-1 text-xs text-muted">Choose a report type and download options</p>
            </div>
            <FileText size={20} className="text-brand-500" />
          </div>

          <div className="grid gap-3 p-5 sm:grid-cols-2">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              const isSelected = selectedReport === report.title;
              return (
                <button
                  key={report.title}
                  onClick={() => setSelectedReport(report.title)}
                  className={`group rounded-xl border p-4 text-left transition-all ${
                    isSelected
                      ? "border-brand-500 bg-brand-50/60 ring-2 ring-brand-100"
                      : "border-line hover:border-brand-100 hover:bg-canvas"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                      isSelected
                        ? "bg-brand-500 text-white"
                        : "bg-canvas text-muted group-hover:bg-white group-hover:text-brand-600"
                    }`}
                  >
                    <Icon size={17} />
                  </span>
                  <p className="mt-4 text-xs font-bold text-ink">{report.title}</p>
                  <p className="mt-1 text-[11px] text-muted">{report.detail}</p>
                </button>
              );
            })}
          </div>

          <div className="border-t border-line bg-canvas p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">
                  Academic year
                </label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line bg-white px-3 text-xs font-semibold text-ink outline-none cursor-pointer"
                >
                  <option>2026 / 2027</option>
                  <option>2025 / 2026</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">
                  Format
                </label>
                <select
                  value={reportFormat}
                  onChange={(e) => setReportFormat(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line bg-white px-3 text-xs font-semibold text-ink outline-none cursor-pointer"
                >
                  <option>CSV file</option>
                  <option>Excel spreadsheet</option>
                  <option>PDF document (Print)</option>
                </select>
              </div>
            </div>

            {downloadSuccess && (
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-mint">
                <Check size={15} /> {downloadSuccess}
              </div>
            )}

            <Button className="mt-4 w-full" onClick={handleGenerate} disabled={generating}>
              <Download size={15} /> {generating ? "Generating..." : `Generate ${selectedReport}`}
            </Button>
          </div>
        </Card>

        {/* Class Ranking */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line p-5">
            <div>
              <h2 className="text-sm font-bold text-ink">Class ranking</h2>
              <p className="mt-1 text-xs text-muted">Based on Term 1 average marks</p>
            </div>
            <button
              type="button"
              onClick={handlePrint}
              aria-label="Print class ranking"
              className="rounded-lg p-2 text-muted hover:bg-canvas hover:text-ink transition-colors"
            >
              <Printer size={16} />
            </button>
          </div>
          <div className="divide-y divide-line">
            {classes.slice(0, 5).map((classItem, index) => {
              const avg = [84, 81, 78, 76, 73][index];
              return (
                <div className="flex items-center gap-3 px-5 py-4" key={classItem.id}>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                      index === 0 ? "bg-[#fff5dd] text-[#ad7c19]" : "bg-canvas text-muted"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-xs font-bold text-ink">
                        {classItem.name} · {classItem.section}
                      </span>
                      <span className="text-xs font-bold text-ink">{avg}%</span>
                    </div>
                    <div className="mt-2">
                      <ProgressBar value={avg} color={classItem.color} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-t border-line bg-canvas px-5 py-4 text-center text-xs text-muted">
            Updated today at 09:30 AM
          </div>
        </Card>
      </div>

      {/* Published reports with working download links */}
      <Card className="mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-line p-5">
          <div>
            <h2 className="text-sm font-bold text-ink">Published reports</h2>
            <p className="mt-1 text-xs text-muted">Reports your team can access</p>
          </div>
          <Button variant="ghost" className="h-8 px-2 text-xs" onClick={() => setArchiveModalOpen(true)}>
            View archive
          </Button>
        </div>
        <div className="grid gap-3 p-5 md:grid-cols-3">
          {["Term 1 progress report", "September attendance", "Grade 8 class analysis"].map((report, index) => (
            <div
              key={report}
              onClick={() => downloadPublishedReport(report)}
              className="flex items-center gap-3 rounded-xl bg-canvas p-3 cursor-pointer hover:bg-slate-100 transition-colors group"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-brand-500 shadow-xs">
                <FileText size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-ink group-hover:text-brand-600 transition-colors">
                  {report}
                </p>
                <p className="mt-1 text-[10px] text-muted">{index === 0 ? "168 students · CSV" : "October 2026 · CSV"}</p>
              </div>
              <Download size={15} className="text-muted group-hover:text-brand-600 transition-colors" />
            </div>
          ))}
        </div>
      </Card>

      {/* Archive Modal */}
      <Modal
        isOpen={archiveModalOpen}
        onClose={() => setArchiveModalOpen(false)}
        title="Report Archive"
        description="Historical and archived reports from previous terms"
      >
        <div className="space-y-2 mt-2">
          {[
            { name: "2025/2026 Annual School Summary", date: "July 2026", size: "1.4 MB" },
            { name: "Term 3 Final Grade Reports", date: "June 2026", size: "980 KB" },
            { name: "Staff Attendance Audit Q2", date: "May 2026", size: "450 KB" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-line p-3 hover:bg-canvas transition-colors"
            >
              <div>
                <p className="text-xs font-bold text-ink">{item.name}</p>
                <p className="text-[10px] text-muted">{item.date} · {item.size}</p>
              </div>
              <Button
                variant="secondary"
                className="h-8 px-2 text-xs"
                onClick={() => downloadPublishedReport(item.name)}
              >
                <Download size={13} /> Download
              </Button>
            </div>
          ))}
        </div>
      </Modal>
    </AppShell>
  );
}
