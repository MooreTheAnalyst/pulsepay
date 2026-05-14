"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send, ArrowDownLeft, Clock, Bell, Eye, EyeOff, ChevronRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionCard } from "@/components/transaction-card";
import { MOCK_USER, MOCK_TRANSACTIONS, CURRENCIES } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";

const QUICK_ACTIONS = [
  { href: "/send", icon: Send, label: "Send", color: "bg-primary/10 text-primary" },
  { href: "/receive", icon: ArrowDownLeft, label: "Receive", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  { href: "/history", icon: Clock, label: "History", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
];

export default function DashboardPage() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const recentTxns = MOCK_TRANSACTIONS.slice(0, 4);

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Good morning,</p>
          <h1 className="text-xl font-bold">{MOCK_USER.name.split(" ")[0]} 👋</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
          </Button>
        </div>
      </div>

      {/* Notification banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 text-sm"
      >
        <TrendingUp className="h-4 w-4 shrink-0 text-primary" />
        <p className="text-foreground">
          <span className="font-medium">USDC rates are favorable today.</span>{" "}
          <span className="text-muted-foreground">Great time to send to Philippines.</span>
        </p>
      </motion.div>

      {/* Balance card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg shadow-primary/20"
      >
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5" />

        <div className="relative">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-sm font-medium opacity-80">Total balance</p>
            <div className="flex items-center gap-2">
              {/* Currency selector */}
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="rounded-lg bg-white/20 px-2 py-1 text-xs font-medium text-primary-foreground outline-none"
              >
                {CURRENCIES.slice(0, 5).map((c) => (
                  <option key={c.code} value={c.code} className="text-foreground bg-background">
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <button onClick={() => setBalanceVisible(!balanceVisible)} className="opacity-80 hover:opacity-100">
                {balanceVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <p className="text-4xl font-bold tracking-tight">
            {balanceVisible ? formatCurrency(MOCK_USER.balance, currency) : "••••••"}
          </p>
          <p className="mt-1 text-sm opacity-70">≈ {MOCK_USER.balance.toFixed(2)} USDC</p>

          <div className="mt-4 flex items-center gap-1.5 text-xs opacity-80">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Wallet verified · Stellar network
          </div>
        </div>
      </motion.div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3">
        {QUICK_ACTIONS.map(({ href, icon: Icon, label, color }, i) => (
          <motion.div
            key={href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link href={href}>
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md active:scale-95">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">{label}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent transactions */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">Recent transactions</h2>
          <Link href="/history" className="flex items-center gap-0.5 text-xs text-primary hover:underline">
            See all <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-card shadow-sm divide-y divide-border">
          {recentTxns.map((tx) => (
            <TransactionCard key={tx.id} tx={tx} />
          ))}
        </div>
      </div>
    </div>
  );
}
