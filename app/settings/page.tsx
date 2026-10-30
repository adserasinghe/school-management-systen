"use client";

import { Bell, Building2, Check, ChevronDown, LockKeyhole, Save, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button, Card, PageHeading } from "@/components/ui";
import { getStorageItem, setStorageItem } from "@/lib/storage";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"School profile" | "My account" | "Notifications" | "Security">("School profile");
  const [saved, setSaved] = useState(false);

  // Form states
  const [schoolName, setSchoolName] = useState("Northstar Academy");
  const [academicYear, setAcademicYear] = useState("2026 / 2027");
  const [email, setEmail] = useState("hello@northstar.edu");
  const [phone, setPhone] = useState("+1 202 555 0100");
  const [address, setAddress] = useState("24 Northstar Avenue, Washington DC");

  // Account states
  const [userName, setUserName] = useState("Jordan Davis");
  const [userEmail, setUserEmail] = useState("jordan@northstar.edu");

  // Notification toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  // Security toggles
  const [twoFactor, setTwoFactor] = useState(true);

  const [gradingScales, setGradingScales] = useState([
    { grade: "A", from: 75, color: "bg-brand-500" },
    { grade: "B", from: 65, color: "bg-mint" },
    { grade: "C", from: 55, color: "bg-amber" },
    { grade: "S", from: 40, color: "bg-[#9579db]" },
    { grade: "F", from: 0, color: "bg-coral" },
  ]);

  useEffect(() => {
    const profile = getStorageItem<{ schoolName: string; academicYear: string; email: string; phone: string; address: string } | null>("lumen_school_profile", null);
    if (profile) {
      setSchoolName(profile.schoolName);
      setAcademicYear(profile.academicYear);
      setEmail(profile.email);
      setPhone(profile.phone);
      setAddress(profile.address);
    }
    const account = getStorageItem<{ userName: string; userEmail: string } | null>("lumen_user_account", null);
    if (account) {
      setUserName(account.userName);
      setUserEmail(account.userEmail);
    }
  }, []);

  const handleSave = () => {
    setStorageItem("lumen_school_profile", { schoolName, academicYear, email, phone, address });
    setStorageItem("lumen_user_account", { userName, userEmail });
    setStorageItem("lumen_grading_scale", gradingScales);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const navItems = [
    { icon: Building2, label: "School profile" as const },
    { icon: UserRound, label: "My account" as const },
    { icon: Bell, label: "Notifications" as const },
    { icon: LockKeyhole, label: "Security" as const },
  ];

  return (
    <AppShell>
      <PageHeading
        eyebrow="Workspace"
        title="Settings"
        description="Keep your school profile, preferences, and access controls up to date."
      />
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Navigation Sidebar */}
        <nav className="flex gap-2 overflow-auto lg:block lg:space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-bold transition-all lg:w-full ${
                  isActive ? "bg-brand-50 text-brand-600 shadow-xs" : "text-muted hover:bg-canvas hover:text-ink"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "School profile" && (
            <>
              <Card className="overflow-hidden">
                <div className="border-b border-line p-5">
                  <h2 className="text-sm font-bold text-ink">School profile</h2>
                  <p className="mt-1 text-xs text-muted">This information appears on reports and communications.</p>
                </div>
                <div className="grid gap-4 p-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">
                      School name
                    </label>
                    <input
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="h-10 w-full rounded-xl border border-line px-3 text-xs font-semibold text-ink outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">
                      Academic year
                    </label>
                    <select
                      value={academicYear}
                      onChange={(e) => setAcademicYear(e.target.value)}
                      className="h-10 w-full rounded-xl border border-line bg-white px-3 text-xs font-semibold text-ink outline-none"
                    >
                      <option>2026 / 2027</option>
                      <option>2025 / 2026</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">
                      School email
                    </label>
                    <input
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 w-full rounded-xl border border-line px-3 text-xs font-semibold text-ink outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">
                      Phone number
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-10 w-full rounded-xl border border-line px-3 text-xs font-semibold text-ink outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">
                      Address
                    </label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="h-10 w-full rounded-xl border border-line px-3 text-xs font-semibold text-ink outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
                    />
                  </div>
                </div>
                <div className="flex justify-end border-t border-line bg-canvas p-4">
                  <Button onClick={handleSave}>
                    {saved ? (
                      <>
                        <Check size={15} /> Saved
                      </>
                    ) : (
                      <>
                        <Save size={15} /> Save changes
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Editable Grading Scale */}
              <Card className="overflow-hidden">
                <div className="border-b border-line p-5">
                  <h2 className="text-sm font-bold text-ink">Grading scale</h2>
                  <p className="mt-1 text-xs text-muted">Configure the percentage thresholds used to calculate grades.</p>
                </div>
                <div className="divide-y divide-line">
                  {gradingScales.map((item, index) => (
                    <div className="flex items-center gap-4 px-5 py-3" key={item.grade}>
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.color} text-xs font-bold text-white`}>
                        {item.grade}
                      </span>
                      <span className="flex-1 text-xs font-semibold text-ink">
                        {item.grade === "F" ? "Below threshold" : "Threshold percentage (%):"}
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={item.from}
                          onChange={(e) => {
                            const val = Number(e.target.value) || 0;
                            setGradingScales((prev) =>
                              prev.map((g, i) => (i === index ? { ...g, from: val } : g))
                            );
                          }}
                          className="h-8 w-16 rounded-lg border border-line px-2 text-center text-xs font-bold text-ink"
                        />
                        <span className="text-xs text-muted">%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {activeTab === "My account" && (
            <Card className="overflow-hidden">
              <div className="border-b border-line p-5">
                <h2 className="text-sm font-bold text-ink">Admin Account</h2>
                <p className="mt-1 text-xs text-muted">Update your personal account credentials and display name.</p>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">
                    Full name
                  </label>
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="h-10 w-full rounded-xl border border-line px-3 text-xs font-semibold text-ink outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">
                    Email address
                  </label>
                  <input
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="h-10 w-full rounded-xl border border-line px-3 text-xs font-semibold text-ink outline-none focus:border-brand-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted">
                    Role & Permissions
                  </label>
                  <input
                    disabled
                    value="Head Administrator (Full Access)"
                    className="h-10 w-full rounded-xl border border-line bg-canvas px-3 text-xs font-semibold text-muted outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end border-t border-line bg-canvas p-4">
                <Button onClick={handleSave}>
                  {saved ? (
                    <>
                      <Check size={15} /> Saved
                    </>
                  ) : (
                    <>
                      <Save size={15} /> Update account
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )}

          {activeTab === "Notifications" && (
            <Card className="overflow-hidden">
              <div className="border-b border-line p-5">
                <h2 className="text-sm font-bold text-ink">Notification Preferences</h2>
                <p className="mt-1 text-xs text-muted">Choose what notifications and alerts you receive.</p>
              </div>
              <div className="divide-y divide-line p-5 space-y-4">
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-xs font-bold text-ink">Daily attendance alerts</p>
                    <p className="text-[11px] text-muted">Receive email when a class attendance is incomplete by 10 AM.</p>
                  </div>
                  <button
                    onClick={() => setEmailAlerts(!emailAlerts)}
                    className={`h-6 w-11 rounded-full transition-colors ${
                      emailAlerts ? "bg-brand-500" : "bg-slate-200"
                    } relative`}
                  >
                    <span
                      className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                        emailAlerts ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-xs font-bold text-ink">Guardian SMS alerts</p>
                    <p className="text-[11px] text-muted">Send automated SMS to parents when students are marked absent.</p>
                  </div>
                  <button
                    onClick={() => setSmsAlerts(!smsAlerts)}
                    className={`h-6 w-11 rounded-full transition-colors ${
                      smsAlerts ? "bg-brand-500" : "bg-slate-200"
                    } relative`}
                  >
                    <span
                      className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                        smsAlerts ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-xs font-bold text-ink">Weekly performance digest</p>
                    <p className="text-[11px] text-muted">Get an executive summary every Monday morning.</p>
                  </div>
                  <button
                    onClick={() => setWeeklyDigest(!weeklyDigest)}
                    className={`h-6 w-11 rounded-full transition-colors ${
                      weeklyDigest ? "bg-brand-500" : "bg-slate-200"
                    } relative`}
                  >
                    <span
                      className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                        weeklyDigest ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div className="flex justify-end border-t border-line bg-canvas p-4">
                <Button onClick={handleSave}>
                  {saved ? (
                    <>
                      <Check size={15} /> Saved
                    </>
                  ) : (
                    <>
                      <Save size={15} /> Save preferences
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )}

          {activeTab === "Security" && (
            <Card className="overflow-hidden">
              <div className="border-b border-line p-5">
                <h2 className="text-sm font-bold text-ink">Security & Authentication</h2>
                <p className="mt-1 text-xs text-muted">Manage session security and two-factor verification.</p>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-ink">Two-Factor Authentication (2FA)</p>
                    <p className="text-[11px] text-muted">Require an authenticator code when signing into administrative accounts.</p>
                  </div>
                  <button
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`h-6 w-11 rounded-full transition-colors ${
                      twoFactor ? "bg-mint" : "bg-slate-200"
                    } relative`}
                  >
                    <span
                      className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                        twoFactor ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="rounded-xl border border-line bg-canvas p-4 flex items-center gap-3">
                  <ShieldCheck className="text-mint shrink-0" size={24} />
                  <div>
                    <p className="text-xs font-bold text-ink">Current Session Encrypted</p>
                    <p className="text-[11px] text-muted">Signed in from Chrome on Linux (Node.js runtime, port 3000)</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end border-t border-line bg-canvas p-4">
                <Button onClick={handleSave}>
                  {saved ? (
                    <>
                      <Check size={15} /> Saved
                    </>
                  ) : (
                    <>
                      <Save size={15} /> Update security settings
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AppShell>
  );
}
