"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  CalendarCheck2,
  CalendarDays,
  Check,
  ChevronRight,
  FileText,
  MoreHorizontal,
  Plus,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import { classes, gradeDistribution, recentActivity, students } from "@/lib/mock-data";
import { AppShell } from "./app-shell";
import { Avatar, Badge, Button, Card, Modal, PageHeading, ProgressBar } from "./ui";

const statCards = [
  { label: "Total students", value: "168", change: "+8.4%", detail: "vs. last term", icon: UsersRound, color: "bg-brand-50 text-brand-600", href: "/students" },
  { label: "Average attendance", value: "92.6%", change: "+2.1%", detail: "vs. last month", icon: CalendarDays, color: "bg-[#e7f8f2] text-mint", href: "/attendance" },
  { label: "Active teachers", value: "24", change: "+1", detail: "this academic year", icon: UserRoundPlus, color: "bg-[#fff4dd] text-[#c5841c]", href: "/classes" },
  { label: "Reports published", value: "86%", change: "On track", detail: "term 1 progress", icon: FileText, color: "bg-[#f1eafd] text-[#8d68cf]", href: "/reports" },
];

export function DashboardView() {
  const router = useRouter();
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [weekFilter, setWeekFilter] = useState<"This week" | "Last week" | "This month">("This week");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const weeklyAttendance = {
    "This week": [78, 84, 76, 91, 87, 94, 92],
    "Last week": [82, 80, 85, 88, 86, 90, 89],
    "This month": [85, 88, 82, 89, 91, 93, 91],
  };

  return (
    <AppShell>
      <PageHeading
        eyebrow="Wednesday, October 29, 2026"
        title="Good morning, Jordan"
        description="Here is what is happening across Northstar Academy today."
        action={
          <Button onClick={() => setQuickActionOpen(true)}>
            <Plus size={16} /> Quick action
          </Button>
        }
      />

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="p-5 transition-shadow hover:shadow-md cursor-pointer"
            >
              <div
                onClick={() => router.push(stat.href)}
                className="flex items-start justify-between"
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon size={19} />
                </span>
                <button
                  type="button"
                  aria-label={`More options for ${stat.label}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenu(activeMenu === stat.label ? null : stat.label);
                  }}
                  className="rounded-lg p-1 text-muted hover:bg-canvas hover:text-ink"
                >
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <div onClick={() => router.push(stat.href)}>
                <p className="mt-5 text-xs font-semibold text-muted">{stat.label}</p>
                <div className="mt-1 flex items-end gap-2">
                  <p className="text-[27px] font-bold tracking-[-0.04em] text-ink">{stat.value}</p>
                  <span className="mb-1 inline-flex items-center gap-0.5 text-[11px] font-bold text-mint">
                    <ArrowUpRight size={12} />
                    {stat.change}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-muted">{stat.detail}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* Attendance chart with interactive period selector */}
        <Card className="overflow-hidden">
          <div className="flex items-start justify-between border-b border-line px-5 py-5 sm:px-6">
            <div>
              <h2 className="text-sm font-bold text-ink">Attendance overview</h2>
              <p className="mt-1 text-xs text-muted">Daily attendance across all classes</p>
            </div>
            <div className="flex items-center gap-1 rounded-xl border border-line bg-canvas p-1">
              {(["This week", "Last week", "This month"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setWeekFilter(period)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors ${
                    weekFilter === period ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="px-5 pb-5 pt-4 sm:px-6">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold tracking-[-0.05em] text-ink">92.6%</p>
                <p className="mt-1 text-[11px] text-mint">2.1% higher than last period</p>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-semibold text-muted">
                <span className="flex items-center gap-1">
                  <i className="h-2 w-2 rounded-full bg-brand-500" />
                  Present
                </span>
                <span className="flex items-center gap-1">
                  <i className="h-2 w-2 rounded-full bg-[#dfe5ef]" />
                  Absent
                </span>
              </div>
            </div>
            <div className="flex h-[178px] items-end justify-between gap-2 border-b border-line px-1">
              {weeklyAttendance[weekFilter].map((height, index) => (
                <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <div className="relative flex h-full w-full items-end justify-center group cursor-pointer" title={`${height}% attendance`}>
                    <div className="w-full max-w-[34px] rounded-t-lg bg-[#dfe5ef]" style={{ height: `${Math.min(100, height + 6)}%` }} />
                    <div className="absolute bottom-0 w-full max-w-[34px] rounded-t-lg bg-brand-500 group-hover:bg-brand-600 transition-all" style={{ height: `${height}%` }} />
                  </div>
                  <span className="translate-y-6 text-[10px] font-semibold text-muted">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Grade Distribution */}
        <Card className="overflow-hidden">
          <div className="flex items-start justify-between border-b border-line px-5 py-5">
            <div>
              <h2 className="text-sm font-bold text-ink">Grade distribution</h2>
              <p className="mt-1 text-xs text-muted">Term 1 marks across all subjects</p>
            </div>
            <Button
              variant="ghost"
              className="h-8 px-2 text-xs"
              onClick={() => router.push("/marks")}
            >
              View marks <ChevronRight size={14} />
            </Button>
          </div>
          <div className="space-y-4 p-5">
            {gradeDistribution.map((grade) => (
              <div key={grade.grade} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-canvas text-xs font-bold text-ink">
                  {grade.grade}
                </span>
                <div className="flex-1">
                  <div className="mb-1.5 flex justify-between text-[11px]">
                    <span className="font-semibold text-muted">{grade.count} students</span>
                    <span className="font-bold text-ink">{grade.percentage}%</span>
                  </div>
                  <ProgressBar value={grade.percentage * 2.2} color={grade.color} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        {/* Class Performance */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-5 sm:px-6">
            <div>
              <h2 className="text-sm font-bold text-ink">Class performance</h2>
              <p className="mt-1 text-xs text-muted">Average marks and attendance by class</p>
            </div>
            <Button
              variant="ghost"
              className="h-8 px-2 text-xs"
              onClick={() => router.push("/classes")}
            >
              View all <ChevronRight size={14} />
            </Button>
          </div>
          <div className="divide-y divide-line">
            {classes.slice(0, 4).map((classItem) => (
              <div
                className="flex items-center gap-3 px-5 py-4 sm:px-6 hover:bg-canvas/50 transition-colors cursor-pointer"
                key={classItem.id}
                onClick={() => router.push("/classes")}
              >
                <span className={`h-9 w-1.5 rounded-full ${classItem.color}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-ink">
                    {classItem.name} <span className="font-medium text-muted">· {classItem.section}</span>
                  </p>
                  <p className="mt-1 text-[11px] text-muted">
                    {classItem.teacher} · {classItem.students} students
                  </p>
                </div>
                <div className="w-24">
                  <div className="mb-1 flex justify-between text-[10px]">
                    <span className="text-muted">Attendance</span>
                    <span className="font-bold text-ink">{classItem.attendance}%</span>
                  </div>
                  <ProgressBar value={classItem.attendance} color={classItem.color} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-5">
            <div>
              <h2 className="text-sm font-bold text-ink">Recent activity</h2>
              <p className="mt-1 text-xs text-muted">Latest updates from your team</p>
            </div>
            <Button
              variant="ghost"
              className="h-8 px-2 text-xs"
              onClick={() => router.push("/attendance")}
            >
              Audit log
            </Button>
          </div>
          <div className="divide-y divide-line">
            {recentActivity.map((activity) => (
              <div key={activity.title} className="flex gap-3 px-5 py-4">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activity.color} text-white`}
                >
                  {activity.icon === "user" ? (
                    <UserRoundPlus size={14} />
                  ) : activity.icon === "calendar" ? (
                    <CalendarDays size={14} />
                  ) : activity.icon === "file" ? (
                    <FileText size={14} />
                  ) : (
                    <Check size={14} />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-ink">{activity.title}</p>
                  <p className="mt-1 text-[11px] leading-4 text-muted">{activity.detail}</p>
                  <p className="mt-1.5 text-[10px] font-semibold text-[#a1aabc]">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Students needing attention */}
      <Card className="mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-5 py-5 sm:px-6">
          <div>
            <h2 className="text-sm font-bold text-ink">Students needing attention</h2>
            <p className="mt-1 text-xs text-muted">Attendance below 90% this month</p>
          </div>
          <Button
            variant="secondary"
            className="h-8 px-3 text-xs"
            onClick={() => router.push("/students")}
          >
            View students
          </Button>
        </div>
        <div className="hidden grid-cols-[1.5fr_1fr_1fr_120px] gap-4 border-b border-line bg-canvas px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a1aabc] sm:grid sm:px-6">
          <span>Student</span>
          <span>Class</span>
          <span>Attendance</span>
          <span>Status</span>
        </div>
        {students
          .filter((student) => student.attendance < 90)
          .slice(0, 3)
          .map((student) => (
            <div
              key={student.id}
              onClick={() => router.push("/students")}
              className="grid gap-3 border-b border-line px-5 py-4 last:border-0 sm:grid-cols-[1.5fr_1fr_1fr_120px] sm:items-center sm:gap-4 sm:px-6 hover:bg-canvas/50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Avatar initials={student.initials} className={student.accent} />
                <div>
                  <p className="text-xs font-bold text-ink">{student.name}</p>
                  <p className="mt-0.5 text-[11px] text-muted">{student.admissionNumber}</p>
                </div>
              </div>
              <span className="text-xs text-muted">{student.className}</span>
              <div>
                <div className="mb-1 flex justify-between text-[11px]">
                  <span className="text-muted sm:hidden">Attendance</span>
                  <span className="font-bold text-coral">{student.attendance}%</span>
                </div>
                <ProgressBar value={student.attendance} color="bg-coral" />
              </div>
              <Badge tone="red">Needs review</Badge>
            </div>
          ))}
      </Card>

      {/* Quick Action Modal */}
      <Modal
        isOpen={quickActionOpen}
        onClose={() => setQuickActionOpen(false)}
        title="Quick Actions"
        description="Choose what you want to do right now"
      >
        <div className="grid gap-3 sm:grid-cols-2 mt-2">
          {[
            {
              title: "Mark attendance",
              desc: "Record today's student attendance",
              icon: CalendarCheck2,
              href: "/attendance",
              color: "text-brand-600 bg-brand-50",
            },
            {
              title: "Enroll new student",
              desc: "Add a student profile to a class",
              icon: UserRoundPlus,
              href: "/students",
              color: "text-mint bg-[#e7f8f2]",
            },
            {
              title: "Enter exam marks",
              desc: "Record test and terminal scores",
              icon: BookOpen,
              href: "/marks",
              color: "text-[#ad7c19] bg-[#fff5dd]",
            },
            {
              title: "Generate report card",
              desc: "Compile class progress reports",
              icon: FileText,
              href: "/reports",
              color: "text-[#7954b6] bg-[#f3edff]",
            },
          ].map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  setQuickActionOpen(false);
                  router.push(action.href);
                }}
                className="flex items-start gap-3 rounded-xl border border-line p-4 text-left transition-all hover:border-brand-200 hover:bg-canvas"
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${action.color}`}>
                  <Icon size={19} />
                </span>
                <div>
                  <p className="text-xs font-bold text-ink">{action.title}</p>
                  <p className="mt-1 text-[11px] text-muted leading-snug">{action.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </Modal>
    </AppShell>
  );
}
