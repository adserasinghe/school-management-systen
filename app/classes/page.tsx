"use client";

import { BookOpen, MoreHorizontal, Plus, Search, Trash2, UsersRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { classes as initialClasses, subjects as initialSubjects } from "@/lib/mock-data";
import { AppShell } from "@/components/app-shell";
import { Avatar, Button, Card, Modal, PageHeading, ProgressBar } from "@/components/ui";
import { getStorageItem, setStorageItem } from "@/lib/storage";

export default function ClassesPage() {
  const [activeTab, setActiveTab] = useState<"classes" | "subjects">("classes");
  const [classList, setClassList] = useState(initialClasses);
  const [subjectList, setSubjectList] = useState(initialSubjects);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  useEffect(() => {
    const savedClasses = getStorageItem<typeof initialClasses>("lumen_classes", initialClasses);
    if (savedClasses && savedClasses.length > 0) setClassList(savedClasses);
    const savedSubjects = getStorageItem<typeof initialSubjects>("lumen_subjects", initialSubjects);
    if (savedSubjects && savedSubjects.length > 0) setSubjectList(savedSubjects);
  }, []);

  // Form states
  const [classNameInput, setClassNameInput] = useState("Grade 8");
  const [classSectionInput, setClassSectionInput] = useState("C");
  const [classRoomInput, setClassRoomInput] = useState("Room 206");
  const [classTeacherInput, setClassTeacherInput] = useState("Sarah Mitchell");
  const [classStudentsInput, setClassStudentsInput] = useState("25");

  const [subjectNameInput, setSubjectNameInput] = useState("");
  const [subjectCodeInput, setSubjectCodeInput] = useState("");
  const [subjectTeacherInput, setSubjectTeacherInput] = useState("Daniel Carter");
  const [subjectClassInput, setSubjectClassInput] = useState("Grade 8 · A");

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    const newClass = {
      id: String(Date.now()),
      name: classNameInput,
      section: classSectionInput,
      room: classRoomInput,
      teacher: classTeacherInput,
      students: Number(classStudentsInput) || 25,
      attendance: 94,
      color: "bg-brand-500",
    };
    const updated = [...classList, newClass];
    setClassList(updated);
    setStorageItem("lumen_classes", updated);
    setModalOpen(false);
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectNameInput.trim()) return;
    const newSubject = {
      name: subjectNameInput,
      code: subjectCodeInput || `SUB-${Math.floor(100 + Math.random() * 900)}`,
      teacher: subjectTeacherInput,
      className: subjectClassInput,
      average: 80,
      color: "bg-mint",
    };
    const updated = [...subjectList, newSubject];
    setSubjectList(updated);
    setStorageItem("lumen_subjects", updated);
    setSubjectNameInput("");
    setSubjectCodeInput("");
    setModalOpen(false);
  };

  const handleDeleteClass = (id: string) => {
    const updated = classList.filter((c) => c.id !== id);
    setClassList(updated);
    setStorageItem("lumen_classes", updated);
    setActiveMenuId(null);
  };

  return (
    <AppShell>
      <PageHeading
        eyebrow="Academic structure"
        title="Classes & subjects"
        description="Organize classrooms, assign teachers, and manage the curriculum."
        action={
          <Button onClick={() => setModalOpen(true)}>
            <Plus size={16} /> Add {activeTab === "classes" ? "class" : "subject"}
          </Button>
        }
      />

      <div className="mb-5 flex gap-1 border-b border-line">
        <button
          onClick={() => setActiveTab("classes")}
          className={`border-b-2 px-4 pb-3 text-sm font-bold transition-colors ${
            activeTab === "classes" ? "border-brand-500 text-brand-600" : "border-transparent text-muted hover:text-ink"
          }`}
        >
          Classes <span className="ml-1 rounded-full bg-canvas px-2 py-0.5 text-[10px]">{classList.length}</span>
        </button>
        <button
          onClick={() => setActiveTab("subjects")}
          className={`border-b-2 px-4 pb-3 text-sm font-bold transition-colors ${
            activeTab === "subjects" ? "border-brand-500 text-brand-600" : "border-transparent text-muted hover:text-ink"
          }`}
        >
          Subjects <span className="ml-1 rounded-full bg-canvas px-2 py-0.5 text-[10px]">{subjectList.length}</span>
        </button>
      </div>

      {activeTab === "classes" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {classList.map((classItem) => (
            <Card className="relative p-5 hover:shadow-md transition-shadow" key={classItem.id}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${classItem.color} text-sm font-bold text-white`}>
                    {classItem.section}
                  </span>
                  <div>
                    <h2 className="text-sm font-bold text-ink">
                      {classItem.name} <span className="font-medium text-muted">· {classItem.section}</span>
                    </h2>
                    <p className="mt-1 text-[11px] text-muted">{classItem.room}</p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    aria-label={`More options for ${classItem.name} ${classItem.section}`}
                    onClick={() => setActiveMenuId(activeMenuId === classItem.id ? null : classItem.id)}
                    className="rounded-lg p-1.5 text-muted hover:bg-canvas hover:text-ink transition-colors"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                  {activeMenuId === classItem.id && (
                    <div className="absolute right-0 top-8 z-30 w-32 rounded-xl border border-line bg-white p-1.5 shadow-lg animate-in fade-in zoom-in-95">
                      <button
                        onClick={() => handleDeleteClass(classItem.id)}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-coral hover:bg-[#fff0f1] text-left"
                      >
                        <Trash2 size={14} /> Remove class
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-canvas p-3">
                  <div className="flex items-center gap-2 text-muted">
                    <UsersRound size={14} />
                    <span className="text-[10px] font-semibold">Students</span>
                  </div>
                  <p className="mt-1 text-lg font-bold text-ink">{classItem.students}</p>
                </div>
                <div className="rounded-xl bg-canvas p-3">
                  <div className="flex items-center gap-2 text-muted">
                    <BookOpen size={14} />
                    <span className="text-[10px] font-semibold">Average</span>
                  </div>
                  <p className="mt-1 text-lg font-bold text-ink">78%</p>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-[11px]">
                  <span className="font-semibold text-muted">Attendance</span>
                  <span className="font-bold text-ink">{classItem.attendance}%</span>
                </div>
                <ProgressBar value={classItem.attendance} color={classItem.color} />
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <div className="flex -space-x-2">
                  <Avatar initials="DC" className="h-7 w-7 border-2 border-white bg-[#dceaff] text-[9px] text-brand-700" />
                  <Avatar initials="OH" className="h-7 w-7 border-2 border-white bg-[#e7f8f2] text-[9px] text-mint" />
                </div>
                <span className="text-[11px] font-semibold text-muted">{classItem.teacher}</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <SubjectList subjects={subjectList} />
      )}

      {/* Add Class / Add Subject Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={activeTab === "classes" ? "Add New Class" : "Add New Subject"}
        description={activeTab === "classes" ? "Create a new classroom section" : "Add a course to curriculum"}
      >
        {activeTab === "classes" ? (
          <form onSubmit={handleAddClass} className="space-y-4 mt-2">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold text-ink">Grade / Name</label>
                <input
                  required
                  value={classNameInput}
                  onChange={(e) => setClassNameInput(e.target.value)}
                  placeholder="e.g. Grade 9"
                  className="h-10 w-full rounded-xl border border-line px-3 text-xs outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-ink">Section</label>
                <input
                  required
                  value={classSectionInput}
                  onChange={(e) => setClassSectionInput(e.target.value)}
                  placeholder="e.g. A"
                  className="h-10 w-full rounded-xl border border-line px-3 text-xs outline-none focus:border-brand-500"
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold text-ink">Room</label>
                <input
                  value={classRoomInput}
                  onChange={(e) => setClassRoomInput(e.target.value)}
                  placeholder="e.g. Room 301"
                  className="h-10 w-full rounded-xl border border-line px-3 text-xs outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-ink">Capacity</label>
                <input
                  type="number"
                  value={classStudentsInput}
                  onChange={(e) => setClassStudentsInput(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line px-3 text-xs outline-none focus:border-brand-500"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-ink">Assigned teacher</label>
              <select
                value={classTeacherInput}
                onChange={(e) => setClassTeacherInput(e.target.value)}
                className="h-10 w-full rounded-xl border border-line bg-white px-3 text-xs outline-none focus:border-brand-500"
              >
                <option>Daniel Carter</option>
                <option>Olivia Hughes</option>
                <option>Marcus Lee</option>
                <option>Sarah Mitchell</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-line">
              <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <Plus size={16} /> Create class
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleAddSubject} className="space-y-4 mt-2">
            <div>
              <label className="mb-1 block text-xs font-bold text-ink">Subject name</label>
              <input
                required
                value={subjectNameInput}
                onChange={(e) => setSubjectNameInput(e.target.value)}
                placeholder="e.g. Chemistry"
                className="h-10 w-full rounded-xl border border-line px-3 text-xs outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-ink">Subject code</label>
              <input
                value={subjectCodeInput}
                onChange={(e) => setSubjectCodeInput(e.target.value)}
                placeholder="e.g. CHEM-09"
                className="h-10 w-full rounded-xl border border-line px-3 text-xs outline-none focus:border-brand-500"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold text-ink">Assigned class</label>
                <select
                  value={subjectClassInput}
                  onChange={(e) => setSubjectClassInput(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line bg-white px-3 text-xs outline-none focus:border-brand-500"
                >
                  <option>Grade 8 · A</option>
                  <option>Grade 8 · B</option>
                  <option>Grade 7 · A</option>
                  <option>Grade 6 · A</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-ink">Teacher</label>
                <select
                  value={subjectTeacherInput}
                  onChange={(e) => setSubjectTeacherInput(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line bg-white px-3 text-xs outline-none focus:border-brand-500"
                >
                  <option>Daniel Carter</option>
                  <option>Olivia Hughes</option>
                  <option>Marcus Lee</option>
                  <option>Sarah Mitchell</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-line">
              <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <Plus size={16} /> Add subject
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </AppShell>
  );
}

function SubjectList({ subjects }: { subjects: typeof initialSubjects }) {
  const [search, setSearch] = useState("");
  const visible = subjects.filter((subject) =>
    `${subject.name} ${subject.code} ${subject.teacher}`.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-line p-4">
        <div className="flex items-center gap-2 rounded-xl bg-canvas px-3">
          <Search size={16} className="text-muted" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search subjects..."
            className="h-10 w-64 bg-transparent text-xs outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-muted hover:text-ink">
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      <div className="hidden grid-cols-4 border-b border-line bg-canvas px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#a1aabc] sm:grid">
        <span>Subject</span>
        <span>Class</span>
        <span>Teacher</span>
        <span>Average</span>
      </div>
      {visible.map((subject) => (
        <div
          key={subject.code}
          className="grid gap-2 border-b border-line px-5 py-4 last:border-0 sm:grid-cols-4 sm:items-center hover:bg-canvas/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className={`h-8 w-1.5 rounded-full ${subject.color}`} />
            <div>
              <p className="text-xs font-bold text-ink">{subject.name}</p>
              <p className="mt-0.5 text-[10px] text-muted">{subject.code}</p>
            </div>
          </div>
          <span className="text-xs text-muted">{subject.className}</span>
          <span className="text-xs font-semibold text-ink">{subject.teacher}</span>
          <div>
            <span className="text-xs font-bold text-ink">{subject.average}%</span>
            <div className="mt-1 w-20">
              <ProgressBar value={subject.average} color={subject.color} />
            </div>
          </div>
        </div>
      ))}
      {visible.length === 0 && (
        <div className="p-8 text-center text-xs text-muted">No subjects found matching &quot;{search}&quot;.</div>
      )}
    </Card>
  );
}
