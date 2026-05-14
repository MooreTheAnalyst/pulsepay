"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Globe, Phone, Shield, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant settlement",
    desc: "Transactions settle in 3–5 seconds on the Stellar network. No waiting days for your money.",
  },
  {
    icon: Phone,
    title: "Phone number transfers",
    desc: "Send money to anyone using just their phone number. No wallet addresses needed.",
  },
  {
    icon: Shield,
    title: "No seed phrases",
    desc: "We handle the blockchain complexity. You just send money like a normal app.",
  },
  {
    icon: Globe,
    title: "Ultra-low fees",
    desc: "Fees as low as $0.25 per transfer. No hidden charges, ever.",
  },
];

const STEPS = [
  { step: "01", title: "Create your account", desc: "Sign up with your phone number in under 2 minutes." },
  { step: "02", title: "Add funds", desc: "Top up your wallet via bank transfer or card." },
  { step: "03", title: "Send anywhere", desc: "Enter a phone number, amount, and hit send. Done." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1 text-xs font-medium">
              <Zap className="h-3 w-3 text-primary" />
              Powered by Stellar &amp; USDC
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Send money across
            <br />
            <span className="text-primary">borders in seconds.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            PulsePay uses Stellar blockchain and USDC stablecoin to move money globally instantly, cheaply, and without the complexity of crypto.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Link href="/auth/sign-up">
              <Button size="lg" className="gap-2 px-8 text-base">
                Get started free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="px-8 text-base">
                See how it works
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            {["No credit card required", "Free to sign up"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Mock phone UI */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mx-auto mt-16 max-w-xs"
        >
          <div className="rounded-3xl border border-border bg-card p-6 shadow-2xl shadow-primary/10">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Your balance</span>
              <Badge variant="secondary" className="text-xs">USDC</Badge>
            </div>
            <p className="text-3xl font-bold">$2,450.75</p>
            <p className="mt-1 text-sm text-muted-foreground">≈ 2,450.75 USDC</p>
            <div className="mt-6 flex gap-2">
              <Link href="/send" className="flex-1">
                <Button className="w-full gap-1.5 text-sm" size="sm">
                  <Zap className="h-3.5 w-3.5" /> Send
                </Button>
              </Link>
              <Link href="/receive" className="flex-1">
                <Button variant="outline" className="w-full text-sm" size="sm">Receive</Button>
              </Link>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { name: "Maria Santos", amount: "-$120.00", color: "text-red-500" },
                { name: "James Okafor", amount: "+$250.00", color: "text-emerald-500" },
              ].map((tx) => (
                <div key={tx.name} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">{tx.name}</span>
                  <span className={`font-medium ${tx.color}`}>{tx.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Built for the modern world</h2>
            <p className="mt-3 text-muted-foreground">Everything you need to send money globally, nothing you don&apos;t.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
            <p className="mt-3 text-muted-foreground">Three simple steps to send money anywhere.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary">
                  {s.step}
                </div>
                {i < STEPS.length - 1 && (
                  <ChevronRight className="absolute right-0 top-4 hidden h-6 w-6 text-muted-foreground md:block" />
                )}
                <h3 className="mb-2 font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Ready to send money smarter?</h2>
          <p className="mt-4 text-muted-foreground">Join thousands of people already using PulsePay to move money across borders.</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="gap-2 px-8">
                Create free account <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Zap className="h-3.5 w-3.5" />
            </span>
            PulsePay
          </div>
          <p>© 2026 PulsePay. Powered by Stellar &amp; USDC.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
