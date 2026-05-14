import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TransactionStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

export function statusColor(status: TransactionStatus): string {
  return {
    completed: "text-emerald-600 dark:text-emerald-400",
    pending: "text-amber-600 dark:text-amber-400",
    failed: "text-red-600 dark:text-red-400",
  }[status];
}

export function statusBadgeVariant(status: TransactionStatus): "default" | "secondary" | "destructive" | "outline" {
  return { completed: "default", pending: "secondary", failed: "destructive" }[status] as ReturnType<typeof statusBadgeVariant>;
}

export function maskPhone(phone: string): string {
  return phone.replace(/(\+?\d{1,3})\s?\d+(\d{4})/, "$1 ••••••$2");
}

export function truncateWalletId(id: string, chars = 8): string {
  return `${id.slice(0, chars)}...${id.slice(-chars)}`;
}
