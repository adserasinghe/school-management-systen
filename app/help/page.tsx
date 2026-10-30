"use client";

import { ArrowUpRight, Check, CircleHelp, FileQuestion, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button, Card, Modal, PageHeading } from "@/components/ui";

export default function HelpPage() {
  const [modalTopic, setModalTopic] = useState<string | null>(null);
  const [contactMessage, setContactMessage] = useState("");
  const [sentMessage, setSentMessage] = useState(false);

  const helpItems = [
    {
      icon: FileQuestion,
      title: "Getting started",
      detail: "Learn the basics of setting up your school workspace.",
      content: (
        <div className="space-y-3 text-xs leading-5 text-ink">
          <p>
            <strong>1. Student Directory:</strong> Navigate to <em>Students</em> to add or enroll new students, track attendance rates, and manage student status.
          </p>
          <p>
            <strong>2. Classes & Curriculum:</strong> Assign teachers and organize classes and sections under <em>Classes & subjects</em>.
          </p>
          <p>
            <strong>3. Daily Attendance:</strong> Mark students as Present, Absent, Late, or Excused daily, and save your records or export to CSV.
          </p>
          <p>
            <strong>4. Assessments:</strong> Enter exam marks and publish terminal grade cards directly to reports.
          </p>
        </div>
      ),
    },
    {
      icon: CircleHelp,
      title: "Common questions",
      detail: "Quick answers about attendance, marks, and reports.",
      content: (
        <div className="space-y-3 text-xs leading-5 text-ink">
          <div>
            <p className="font-bold text-brand-600">How is attendance percentage calculated?</p>
            <p className="text-muted">Attendance % = (Days Present + Days Late) / Total School Days × 100.</p>
          </div>
          <div>
            <p className="font-bold text-brand-600">Can I export reports to Excel / CSV?</p>
            <p className="text-muted">Yes! Every table has an Export button in the top action bar that downloads a .csv file.</p>
          </div>
          <div>
            <p className="font-bold text-brand-600">How do I change grading thresholds?</p>
            <p className="text-muted">Go to Settings &gt; Grading scale and enter custom percentage cutoffs.</p>
          </div>
        </div>
      ),
    },
    {
      icon: MessageCircle,
      title: "Contact support",
      detail: "Our team is here when you need a hand.",
      content: (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSentMessage(true);
            setTimeout(() => {
              setSentMessage(false);
              setContactMessage("");
              setModalTopic(null);
            }, 2500);
          }}
          className="space-y-3"
        >
          <div>
            <label className="mb-1 block text-xs font-bold text-ink">Your inquiry</label>
            <textarea
              required
              rows={3}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Describe your issue or feature request..."
              className="w-full rounded-xl border border-line p-3 text-xs outline-none focus:border-brand-500"
            />
          </div>
          {sentMessage && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-mint">
              <Check size={14} /> Message dispatched to support team!
            </div>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalTopic(null)}>
              Close
            </Button>
            <Button type="submit">
              <Send size={14} /> Send message
            </Button>
          </div>
        </form>
      ),
    },
  ];

  return (
    <AppShell>
      <PageHeading
        eyebrow="Support"
        title="Help center"
        description="Find answers or get in touch with the Lumen team."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {helpItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              className="group p-5 transition-all hover:border-brand-200 hover:shadow-md cursor-pointer"
              key={item.title}
              onClick={() => setModalTopic(item.title)}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-canvas text-brand-600 group-hover:bg-brand-50">
                <Icon size={19} />
              </span>
              <h2 className="mt-5 text-sm font-bold text-ink">{item.title}</h2>
              <p className="mt-2 text-xs leading-5 text-muted">{item.detail}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform">
                Explore <ArrowUpRight size={14} />
              </span>
            </Card>
          );
        })}
      </div>

      <Modal
        isOpen={!!modalTopic}
        onClose={() => setModalTopic(null)}
        title={modalTopic ?? ""}
        description="Documentation and support guide"
      >
        <div className="mt-2">
          {helpItems.find((h) => h.title === modalTopic)?.content}
        </div>
      </Modal>
    </AppShell>
  );
}
