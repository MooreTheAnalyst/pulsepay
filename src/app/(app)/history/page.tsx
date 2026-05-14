"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TransactionCard } from "@/components/transaction-card";
import { MOCK_TRANSACTIONS } from "@/lib/mock-data";
import { formatRelativeDate } from "@/lib/utils";
import type { TransactionStatus, TransactionType } from "@/lib/types";

type Filter = "all" | TransactionType | TransactionStatus;

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Sent", value: "send" },
  { label: "Received", value: "receive" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((tx) => {
      const matchesSearch =
        !search ||
        tx.recipientName.toLowerCase().includes(search.toLowerCase()) ||
        tx.recipientPhone.includes(search);

      const matchesFilter =
        filter === "all" ||
        tx.type === filter ||
        tx.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  // Group by relative date
  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    for (const tx of filtered) {
      const label = formatRelativeDate(tx.createdAt);
      if (!groups[label]) groups[label] = [];
      groups[label].push(tx);
    }
    return groups;
  }, [filtered]);

  return (
    <div className="px-4 py-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">Transaction History</h1>
        <p className="text-sm text-muted-foreground">{MOCK_TRANSACTIONS.length} transactions</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <ArrowUpRight className="h-3.5 w-3.5 text-red-500" /> Total sent
          </div>
          <p className="text-lg font-bold">
            ${MOCK_TRANSACTIONS.filter((t) => t.type === "send" && t.status === "completed")
              .reduce((s, t) => s + t.amount, 0).toFixed(2)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-500" /> Total received
          </div>
          <p className="text-lg font-bold">
            ${MOCK_TRANSACTIONS.filter((t) => t.type === "receive" && t.status === "completed")
              .reduce((s, t) => s + t.amount, 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Transaction list */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium">No transactions found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="space-y-5">
          {Object.entries(grouped).map(([date, txns], i) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">{date}</p>
              <div className="rounded-2xl border border-border bg-card shadow-sm divide-y divide-border">
                {txns.map((tx) => (
                  <TransactionCard key={tx.id} tx={tx} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
