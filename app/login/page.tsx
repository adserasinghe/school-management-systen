"use client";

import Link from "next/link";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <main className="flex min-h-screen bg-white">
      <section className="relative hidden overflow-hidden bg-[#1d4fae] lg:flex lg:w-[48%] lg:flex-col lg:justify-between lg:p-14">
        <div className="absolute -right-36 -top-32 h-[440px] w-[440px] rounded-full border-[80px] border-white/5" />
        <div className="absolute -bottom-48 -left-24 h-[430px] w-[430px] rounded-full border-[70px] border-white/5" />
        <div className="relative">
          <div className="flex items-center gap-3 text-white"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-black text-brand-600">L</span><div><p className="text-lg font-extrabold tracking-[-0.04em]">lumen</p><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/60">school OS</p></div></div>
          <div className="mt-28 max-w-md"><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">One calm place to run school</p><h1 className="text-5xl font-bold leading-[1.08] tracking-[-0.05em] text-white">Make every school day count.</h1><p className="mt-6 text-base leading-7 text-blue-100">Simple tools for your team, clearer insights for your decisions, and more time for your students.</p></div>
        </div>
        <p className="relative text-xs text-blue-200">© 2026 Northstar Academy · Built for better learning</p>
      </section>
      <section className="flex w-full items-center justify-center px-6 py-12 sm:px-12 lg:w-[52%]">
        <div className="w-full max-w-[390px]">
          <div className="mb-10 lg:hidden"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-lg font-black text-white">L</span><span className="text-lg font-extrabold tracking-[-0.04em] text-ink">lumen</span></div></div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-500">Welcome back</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-ink">Sign in to your workspace</h1>
          <p className="mt-2 text-sm text-muted">Use your school account to continue.</p>
          <form className="mt-8 space-y-5" onSubmit={(event) => event.preventDefault()}>
            <label className="block"><span className="mb-2 block text-xs font-bold text-ink">Email address</span><div className="flex items-center gap-3 rounded-xl border border-line px-3 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-50"><Mail size={17} className="text-muted" /><input type="email" placeholder="you@northstar.edu" className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-[#b2b8c5]" defaultValue="jordan@northstar.edu" /></div></label>
            <label className="block"><div className="mb-2 flex items-center justify-between"><span className="text-xs font-bold text-ink">Password</span><a href="#" className="text-xs font-semibold text-brand-600 hover:underline">Forgot password?</a></div><div className="flex items-center gap-3 rounded-xl border border-line px-3 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-50"><LockKeyhole size={17} className="text-muted" /><input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-[#b2b8c5]" defaultValue="password" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="text-muted" aria-label="Toggle password visibility">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
            <Link href="/dashboard" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-500 text-sm font-bold text-white transition-colors hover:bg-brand-600">Sign in <ArrowRight size={16} /></Link>
          </form>
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted"><ShieldCheck size={15} className="text-mint" /> Your data is protected with secure access</div>
        </div>
      </section>
    </main>
  );
}

