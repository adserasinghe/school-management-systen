"use client";

import { Download, MoreHorizontal, Plus, Search, SlidersHorizontal, Trash2, UserCheck, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { students as initialStudents, type Student, type StudentStatus } from "@/lib/mock-data";
import { AppShell } from "@/components/app-shell";
import { Avatar, Badge, Button, Card, Modal, PageHeading, ProgressBar } from "@/components/ui";
import { downloadCSV } from "@/lib/download";
import { getStorageItem, setStorageItem } from "@/lib/storage";

const statusTone: Record<StudentStatus, "green" | "gray" | "purple"> = {
  Active: "green",
  Inactive: "gray",
  Graduated: "purple",
};

const ITEMS_PER_PAGE = 5;

export default function StudentsPage() {
  const [studentList, setStudentList] = useState<Student[]>(initialStudents);

  useEffect(() => {
    const saved = getStorageItem<Student[]>("lumen_students", initialStudents);
    if (saved && saved.length > 0) {
      setStudentList(saved);
    }
  }, []);
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All classes");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // New Student Form State
  const [newName, setNewName] = useState("");
  const [newClass, setNewClass] = useState("Grade 8 · A");
  const [newGuardian, setNewGuardian] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newStatus, setNewStatus] = useState<StudentStatus>("Active");

  const filtered = useMemo(() => {
    return studentList.filter((student) => {
      const matchesQuery = `${student.name} ${student.admissionNumber} ${student.guardian}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesClass = classFilter === "All classes" || student.className.includes(classFilter);
      const matchesStatus = statusFilter === "All" || student.status === statusFilter;
      return matchesQuery && matchesClass && matchesStatus;
    });
  }, [studentList, query, classFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const initials = newName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newStudent: Student = {
      id: String(Date.now()),
      name: newName.trim(),
      initials: initials || "ST",
      admissionNumber: `STU-${Math.floor(2400 + studentList.length + 1)}`,
      className: newClass,
      guardian: newGuardian.trim() || "Parent / Guardian",
      phone: newPhone.trim() || "+1 202 555 0100",
      attendance: 100,
      status: newStatus,
      accent: "bg-[#dceaff] text-[#3566b4]",
    };

    const updated = [newStudent, ...studentList];
    setStudentList(updated);
    setStorageItem("lumen_students", updated);
    setNewName("");
    setNewGuardian("");
    setNewPhone("");
    setAddModalOpen(false);
  };

  const handleDeleteStudent = (id: string) => {
    const updated = studentList.filter((s) => s.id !== id);
    setStudentList(updated);
    setStorageItem("lumen_students", updated);
    setActiveMenuId(null);
  };

  const handleExport = () => {
    const headers = ["Admission No", "Name", "Class", "Guardian", "Phone", "Attendance %", "Status"];
    const rows = filtered.map((s) => [
      s.admissionNumber,
      s.name,
      s.className,
      s.guardian,
      s.phone,
      s.attendance,
      s.status,
    ]);
    downloadCSV("students_directory.csv", headers, rows);
  };

  return (
    <AppShell>
      <PageHeading
        eyebrow="Directory"
        title="Students"
        description="Manage student profiles, enrollment, and academic progress."
        action={
          <Button onClick={() => setAddModalOpen(true)}>
            <Plus size={16} /> Add student
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-xs font-semibold text-muted">Total students</p>
          <p className="mt-1 text-2xl font-bold text-ink">{studentList.length}</p>
          <p className="mt-1 text-[11px] font-semibold text-mint">+8 this term</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-semibold text-muted">Active enrollment</p>
          <p className="mt-1 text-2xl font-bold text-ink">
            {studentList.filter((s) => s.status === "Active").length}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-brand-600">
            {Math.round((studentList.filter((s) => s.status === "Active").length / (studentList.length || 1)) * 100)}% of total
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-semibold text-muted">Average attendance</p>
          <p className="mt-1 text-2xl font-bold text-ink">
            {Math.round(studentList.reduce((acc, curr) => acc + curr.attendance, 0) / (studentList.length || 1))}%
          </p>
          <p className="mt-1 text-[11px] font-semibold text-mint">+2.1% this month</p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        {/* Controls */}
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-canvas px-3 sm:max-w-[300px]">
            <Search size={16} className="text-muted" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search students..."
              className="h-10 w-full bg-transparent text-xs outline-none placeholder:text-[#a1aabc]"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-muted hover:text-ink">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={classFilter}
              onChange={(event) => {
                setClassFilter(event.target.value);
                setPage(1);
              }}
              className="h-10 rounded-xl border border-line bg-white px-3 text-xs font-semibold text-ink outline-none"
            >
              <option>All classes</option>
              <option>Grade 8</option>
              <option>Grade 7</option>
              <option>Grade 6</option>
            </select>
            <Button
              variant={showFilters ? "primary" : "secondary"}
              onClick={() => setShowFilters(!showFilters)}
              className="h-10 px-3"
            >
              <SlidersHorizontal size={15} />
              <span className="hidden sm:inline">Filters</span>
            </Button>
            <Button variant="secondary" onClick={handleExport} className="h-10 px-3">
              <Download size={15} />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        {/* Filter bar expanded */}
        {showFilters && (
          <div className="flex flex-wrap items-center gap-4 border-b border-line bg-canvas/60 px-5 py-3 text-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-muted">Status:</span>
              {(["All", "Active", "Inactive", "Graduated"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setPage(1);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                    statusFilter === status
                      ? "bg-brand-500 text-white"
                      : "bg-white text-ink border border-line hover:bg-canvas"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            {(statusFilter !== "All" || classFilter !== "All classes" || query) && (
              <button
                onClick={() => {
                  setStatusFilter("All");
                  setClassFilter("All classes");
                  setQuery("");
                  setPage(1);
                }}
                className="ml-auto text-xs font-semibold text-brand-600 hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>
        )}

        {/* Table header */}
        <div className="hidden grid-cols-[1.6fr_1fr_1.2fr_1fr_90px_40px] gap-4 border-b border-line bg-canvas px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a1aabc] lg:grid">
          <span>Student</span>
          <span>Admission no.</span>
          <span>Class</span>
          <span>Attendance</span>
          <span>Status</span>
          <span />
        </div>

        {/* Table Rows */}
        {paginated.map((student) => (
          <div
            key={student.id}
            className="relative grid gap-3 border-b border-line px-4 py-4 last:border-0 sm:px-5 lg:grid-cols-[1.6fr_1fr_1.2fr_1fr_90px_40px] lg:items-center lg:gap-4 hover:bg-canvas/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Avatar initials={student.initials} className={student.accent} />
              <div>
                <p className="text-xs font-bold text-ink">{student.name}</p>
                <p className="mt-0.5 text-[11px] text-muted">
                  {student.guardian} · {student.phone}
                </p>
              </div>
            </div>
            <span className="text-xs text-muted">{student.admissionNumber}</span>
            <span className="text-xs font-semibold text-ink">{student.className}</span>
            <div>
              <div className="mb-1 flex justify-between text-[11px]">
                <span className="text-muted lg:hidden">Attendance</span>
                <span className={`font-bold ${student.attendance < 85 ? "text-coral" : "text-ink"}`}>
                  {student.attendance}%
                </span>
              </div>
              <ProgressBar
                value={student.attendance}
                color={student.attendance < 85 ? "bg-coral" : "bg-mint"}
              />
            </div>
            <div>
              <Badge tone={statusTone[student.status]}>{student.status}</Badge>
            </div>
            <div className="relative">
              <button
                type="button"
                aria-label={`More options for ${student.name}`}
                onClick={() => setActiveMenuId(activeMenuId === student.id ? null : student.id)}
                className="rounded-lg p-1.5 text-muted hover:bg-canvas hover:text-ink transition-colors"
              >
                <MoreHorizontal size={17} />
              </button>
              {activeMenuId === student.id && (
                <div className="absolute right-0 top-8 z-30 w-36 rounded-xl border border-line bg-white p-1.5 shadow-lg animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => {
                      alert(`Viewing profile for ${student.name} (${student.admissionNumber})`);
                      setActiveMenuId(null);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-ink hover:bg-canvas text-left"
                  >
                    <UserCheck size={14} className="text-muted" /> Profile
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-coral hover:bg-[#fff0f1] text-left"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-12 text-center text-sm text-muted">No students matched your search criteria.</div>
        )}

        {/* Pagination Footer */}
        <div className="flex flex-col gap-3 border-t border-line px-5 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            Showing <strong className="text-ink">{paginated.length}</strong> of{" "}
            <strong className="text-ink">{filtered.length}</strong> students
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="h-8 rounded-lg border border-line px-3 font-semibold text-ink disabled:opacity-40 hover:bg-canvas transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`h-8 w-8 rounded-lg font-semibold transition-colors ${
                  currentPage === idx + 1 ? "bg-brand-500 text-white" : "border border-line text-ink hover:bg-canvas"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="h-8 rounded-lg border border-line px-3 font-semibold text-ink disabled:opacity-40 hover:bg-canvas transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </Card>

      {/* Add Student Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Student"
        description="Enroll a new student to Northstar Academy"
      >
        <form onSubmit={handleAddStudent} className="space-y-4 mt-2">
          <div>
            <label className="mb-1 block text-xs font-bold text-ink">Full name</label>
            <input
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Liam Johnson"
              className="h-10 w-full rounded-xl border border-line px-3 text-xs outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold text-ink">Class</label>
              <select
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
                className="h-10 w-full rounded-xl border border-line bg-white px-3 text-xs outline-none focus:border-brand-500"
              >
                <option>Grade 8 · A</option>
                <option>Grade 8 · B</option>
                <option>Grade 7 · A</option>
                <option>Grade 7 · B</option>
                <option>Grade 6 · A</option>
                <option>Grade 6 · B</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-ink">Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as StudentStatus)}
                className="h-10 w-full rounded-xl border border-line bg-white px-3 text-xs outline-none focus:border-brand-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Graduated">Graduated</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-ink">Guardian name</label>
            <input
              value={newGuardian}
              onChange={(e) => setNewGuardian(e.target.value)}
              placeholder="e.g. Jennifer Johnson"
              className="h-10 w-full rounded-xl border border-line px-3 text-xs outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-ink">Phone number</label>
            <input
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="e.g. +1 202 555 0199"
              className="h-10 w-full rounded-xl border border-line px-3 text-xs outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-line">
            <Button type="button" variant="secondary" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <Plus size={16} /> Enroll student
            </Button>
          </div>
        </form>
      </Modal>
    </AppShell>
  );
}
