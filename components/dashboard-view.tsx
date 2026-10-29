"use client";

import {
  ArrowUpRight,
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
import { Avatar, Badge, Button, Card, PageHeading, ProgressBar } from "./ui";

const statCards = [
  { label: "Total students", value: "168", change: "+8.4%", detail: "vs. last term", icon: UsersRound, color: "bg-brand-50 text-brand-600" },
  { label: "Average attendance", value: "92.6%", change: "+2.1%", detail: "vs. last month", icon: CalendarDays, color: "bg-[#e7f8f2] text-mint" },
  { label: "Active teachers", value: "24", change: "+1", detail: "this academic year", icon: UserRoundPlus, color: "bg-[#fff4dd] text-[#c5841c]" },
  { label: "Reports published", value: "86%", change: "On track", detail: "term 1 progress", icon: FileText, color: "bg-[#f1eafd] text-[#8d68cf]" },
];

export function DashboardView() {
  return (
    <AppShell>
      <PageHeading
        eyebrow="Wednesday, October 29, 2026"
        title="Good morning, Jordan"
        description="Here is what is happening across Northstar Academy today."
        action={<Button><Plus size={16} /> Quick action</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-5">
              <div className="flex items-start justify-between">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}><Icon size={19} /></span>
                <button aria-label={`More options for ${stat.label}`} className="text-muted"><MoreHorizontal size={18} /></button>
              </div>
              <p className="mt-5 text-xs font-semibold text-muted">{stat.label}</p>
              <div className="mt-1 flex items-end gap-2">
                <p className="text-[27px] font-bold tracking-[-0.04em] text-ink">{stat.value}</p>
                <span className="mb-1 inline-flex items-center gap-0.5 text-[11px] font-bold text-mint"><ArrowUpRight size={12} />{stat.change}</span>
              </div>
              <p className="mt-1 text-[11px] text-muted">{stat.detail}</p>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="overflow-hidden">
          <div className="flex items-start justify-between border-b border-line px-5 py-5 sm:px-6">
            <div>
              <h2 className="text-sm font-bold text-ink">Attendance overview</h2>
              <p className="mt-1 text-xs text-muted">Daily attendance across all classes</p>
            </div>
            <button className="flex items-center gap-1 rounded-lg border border-line px-2.5 py-1.5 text-[11px] font-semibold text-muted">This week <ChevronRight size={13} /></button>
          </div>
          <div className="px-5 pb-5 pt-4 sm:px-6">
            <div className="mb-5 flex items-end justify-between">
              <div><p className="text-3xl font-bold tracking-[-0.05em] text-ink">92.6%</p><p className="mt-1 text-[11px] text-mint">2.1% higher than last week</p></div>
              <div className="flex items-center gap-3 text-[10px] font-semibold text-muted"><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-brand-500" />Present</span><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-[#dfe5ef]" />Absent</span></div>
            </div>
            <div className="flex h-[178px] items-end justify-between gap-2 border-b border-line px-1">
              {[78, 84, 76, 91, 87, 94, 92].map((height, index) => (
                <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <div className="relative flex h-full w-full items-end justify-center">
                    <div className="w-full max-w-[34px] rounded-t-lg bg-[#dfe5ef]" style={{ height: `${Math.min(100, height + 5)}%` }} />
                    <div className="absolute bottom-0 w-full max-w-[34px] rounded-t-lg bg-brand-500" style={{ height: `${height}%` }} />
                  </div>
                  <span className="translate-y-6 text-[10px] font-semibold text-muted">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="flex items-start justify-between border-b border-line px-5 py-5">
            <div><h2 className="text-sm font-bold text-ink">Grade distribution</h2><p className="mt-1 text-xs text-muted">Term 1 marks across all subjects</p></div>
            <button aria-label="More grade options" className="text-muted"><MoreHorizontal size={18} /></button>
          </div>
          <div className="space-y-4 p-5">
            {gradeDistribution.map((grade) => (
              <div key={grade.grade} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-canvas text-xs font-bold text-ink">{grade.grade}</span>
                <div className="flex-1"><div className="mb-1.5 flex justify-between text-[11px]"><span className="font-semibold text-muted">{grade.count} students</span><span className="font-bold text-ink">{grade.percentage}%</span></div><ProgressBar value={grade.percentage * 2.2} color={grade.color} /></div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-5 sm:px-6">
            <div><h2 className="text-sm font-bold text-ink">Class performance</h2><p className="mt-1 text-xs text-muted">Average marks and attendance by class</p></div>
            <Button variant="ghost" className="h-8 px-2 text-xs">View all <ChevronRight size={14} /></Button>
          </div>
          <div className="divide-y divide-line">
            {classes.slice(0, 4).map((classItem) => (
              <div className="flex items-center gap-3 px-5 py-4 sm:px-6" key={classItem.id}>
                <span className={`h-9 w-1.5 rounded-full ${classItem.color}`} />
                <div className="min-w-0 flex-1"><p className="text-xs font-bold text-ink">{classItem.name} <span className="font-medium text-muted">· {classItem.section}</span></p><p className="mt-1 text-[11px] text-muted">{classItem.teacher} · {classItem.students} students</p></div>
                <div className="w-24"><div className="mb-1 flex justify-between text-[10px]"><span className="text-muted">Attendance</span><span className="font-bold text-ink">{classItem.attendance}%</span></div><ProgressBar value={classItem.attendance} color={classItem.color} /></div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-5"><div><h2 className="text-sm font-bold text-ink">Recent activity</h2><p className="mt-1 text-xs text-muted">Latest updates from your team</p></div><button aria-label="More activity options" className="text-muted"><MoreHorizontal size={18} /></button></div>
          <div className="divide-y divide-line">
            {recentActivity.map((activity) => (
              <div key={activity.title} className="flex gap-3 px-5 py-4">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activity.color} text-white`}>{activity.icon === "user" ? <UserRoundPlus size={14} /> : activity.icon === "calendar" ? <CalendarDays size={14} /> : activity.icon === "file" ? <FileText size={14} /> : <Check size={14} />}</span>
                <div className="min-w-0"><p className="text-xs font-bold text-ink">{activity.title}</p><p className="mt-1 text-[11px] leading-4 text-muted">{activity.detail}</p><p className="mt-1.5 text-[10px] font-semibold text-[#a1aabc]">{activity.time}</p></div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-5 py-5 sm:px-6"><div><h2 className="text-sm font-bold text-ink">Students needing attention</h2><p className="mt-1 text-xs text-muted">Attendance below 85% this month</p></div><Button variant="secondary" className="h-8 px-3 text-xs">View students</Button></div>
        <div className="hidden grid-cols-[1.5fr_1fr_1fr_120px] gap-4 border-b border-line bg-canvas px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a1aabc] sm:grid sm:px-6"><span>Student</span><span>Class</span><span>Attendance</span><span>Status</span></div>
        {students.filter((student) => student.attendance < 90).slice(0, 3).map((student) => (
          <div key={student.id} className="grid gap-3 border-b border-line px-5 py-4 last:border-0 sm:grid-cols-[1.5fr_1fr_1fr_120px] sm:items-center sm:gap-4 sm:px-6">
            <div className="flex items-center gap-3"><Avatar initials={student.initials} className={student.accent} /><div><p className="text-xs font-bold text-ink">{student.name}</p><p className="mt-0.5 text-[11px] text-muted">{student.admissionNumber}</p></div></div>
            <span className="text-xs text-muted">{student.className}</span>
            <div><div className="mb-1 flex justify-between text-[11px]"><span className="text-muted sm:hidden">Attendance</span><span className="font-bold text-coral">{student.attendance}%</span></div><ProgressBar value={student.attendance} color="bg-coral" /></div>
            <Badge tone="red">Needs review</Badge>
          </div>
        ))}
      </Card>
    </AppShell>
  );
}

