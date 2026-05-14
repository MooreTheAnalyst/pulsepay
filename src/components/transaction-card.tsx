import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, formatCurrency, formatRelativeDate, statusBadgeVariant } from "@/lib/utils";
import type { Transaction } from "@/lib/types";

export function TransactionCard({ tx }: { tx: Transaction }) {
  const isSend = tx.type === "send";
  return (
    <div className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-muted/50">
      <div className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
        isSend ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
               : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
      )}>
        {isSend ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
      </div>

      <div className="flex flex-1 items-center justify-between gap-2 min-w-0">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{tx.recipientName}</p>
          <p className="text-xs text-muted-foreground">{formatRelativeDate(tx.createdAt)}</p>
        </div>
        <div className="text-right shrink-0">
          <p className={cn("text-sm font-semibold", isSend ? "text-foreground" : "text-emerald-600 dark:text-emerald-400")}>
            {isSend ? "-" : "+"}{formatCurrency(tx.amount, tx.currency)}
          </p>
          <Badge variant={statusBadgeVariant(tx.status)} className="text-[10px] px-1.5 py-0">
            {tx.status}
          </Badge>
        </div>
      </div>
    </div>
  );
}
