export type StudentStatus = "Active" | "Inactive" | "Graduated";
export type AttendanceStatus = "Present" | "Absent" | "Late" | "Excused";

export type Student = {
  id: string;
  name: string;
  initials: string;
  admissionNumber: string;
  className: string;
  guardian: string;
  phone: string;
  attendance: number;
  status: StudentStatus;
  accent: string;
};

export const students: Student[] = [
  { id: "1", name: "Amara Okafor", initials: "AO", admissionNumber: "STU-2401", className: "Grade 8 · A", guardian: "Nneka Okafor", phone: "+1 202 555 0142", attendance: 96, status: "Active", accent: "bg-[#dceaff] text-[#3566b4]" },
  { id: "2", name: "Lucas Bennett", initials: "LB", admissionNumber: "STU-2402", className: "Grade 8 · A", guardian: "James Bennett", phone: "+1 202 555 0176", attendance: 91, status: "Active", accent: "bg-[#ffe8d9] text-[#bb6c39]" },
  { id: "3", name: "Maya Chen", initials: "MC", admissionNumber: "STU-2403", className: "Grade 8 · B", guardian: "Wen Chen", phone: "+1 202 555 0184", attendance: 88, status: "Active", accent: "bg-[#e2f5ee] text-[#27866e]" },
  { id: "4", name: "Noah Williams", initials: "NW", admissionNumber: "STU-2404", className: "Grade 7 · A", guardian: "Sarah Williams", phone: "+1 202 555 0153", attendance: 84, status: "Active", accent: "bg-[#f7e6fb] text-[#9a4db3]" },
  { id: "5", name: "Sofia Martinez", initials: "SM", admissionNumber: "STU-2405", className: "Grade 8 · A", guardian: "Elena Martinez", phone: "+1 202 555 0119", attendance: 98, status: "Active", accent: "bg-[#fff1cb] text-[#ad7c19]" },
  { id: "6", name: "Ethan Brown", initials: "EB", admissionNumber: "STU-2406", className: "Grade 6 · B", guardian: "Michael Brown", phone: "+1 202 555 0198", attendance: 79, status: "Inactive", accent: "bg-[#e7eaf0] text-[#626c80]" },
  { id: "7", name: "Zoe Patel", initials: "ZP", admissionNumber: "STU-2407", className: "Grade 7 · A", guardian: "Anika Patel", phone: "+1 202 555 0134", attendance: 94, status: "Active", accent: "bg-[#f9e1e3] text-[#b8535e]" },
  { id: "8", name: "Oliver Smith", initials: "OS", admissionNumber: "STU-2408", className: "Grade 8 · B", guardian: "Emma Smith", phone: "+1 202 555 0162", attendance: 89, status: "Active", accent: "bg-[#e0f0f8] text-[#377b9c]" },
];

export const classes = [
  { id: "1", name: "Grade 8", section: "A", room: "Room 204", teacher: "Daniel Carter", students: 28, attendance: 92, color: "bg-brand-500" },
  { id: "2", name: "Grade 8", section: "B", room: "Room 205", teacher: "Olivia Hughes", students: 26, attendance: 88, color: "bg-mint" },
  { id: "3", name: "Grade 7", section: "A", room: "Room 103", teacher: "Marcus Lee", students: 31, attendance: 95, color: "bg-amber" },
  { id: "4", name: "Grade 7", section: "B", room: "Room 104", teacher: "Sarah Mitchell", students: 29, attendance: 91, color: "bg-coral" },
  { id: "5", name: "Grade 6", section: "A", room: "Room 101", teacher: "Daniel Carter", students: 27, attendance: 86, color: "bg-[#9579db]" },
  { id: "6", name: "Grade 6", section: "B", room: "Room 102", teacher: "Olivia Hughes", students: 25, attendance: 90, color: "bg-[#53a6ba]" },
];

export const subjects = [
  { name: "Mathematics", code: "MATH-08", teacher: "Daniel Carter", className: "Grade 8 · A", average: 78, color: "bg-brand-500" },
  { name: "English Language", code: "ENG-08", teacher: "Olivia Hughes", className: "Grade 8 · A", average: 84, color: "bg-mint" },
  { name: "Integrated Science", code: "SCI-08", teacher: "Marcus Lee", className: "Grade 8 · B", average: 73, color: "bg-amber" },
  { name: "Social Studies", code: "SOC-07", teacher: "Sarah Mitchell", className: "Grade 7 · A", average: 81, color: "bg-coral" },
];

export const attendanceRows: Array<Student & { today: AttendanceStatus }> = students.slice(0, 6).map((student, index) => ({
  ...student,
  today: index === 3 ? "Late" : index === 5 ? "Absent" : "Present",
}));

export const recentActivity = [
  { title: "Marks entered", detail: "Daniel Carter added Mathematics marks for Grade 8 A", time: "12 minutes ago", color: "bg-brand-500", icon: "check" },
  { title: "New enrollment", detail: "Sofia Martinez was added to Grade 8 A", time: "42 minutes ago", color: "bg-mint", icon: "user" },
  { title: "Attendance updated", detail: "Grade 7 A attendance was marked for today", time: "1 hour ago", color: "bg-amber", icon: "calendar" },
  { title: "Report published", detail: "Term 1 report cards are ready to view", time: "Yesterday", color: "bg-coral", icon: "file" },
];

export const gradeDistribution = [
  { grade: "A", count: 42, percentage: 45, color: "bg-brand-500" },
  { grade: "B", count: 31, percentage: 33, color: "bg-mint" },
  { grade: "C", count: 14, percentage: 15, color: "bg-amber" },
  { grade: "S", count: 5, percentage: 5, color: "bg-[#9579db]" },
  { grade: "F", count: 2, percentage: 2, color: "bg-coral" },
];

