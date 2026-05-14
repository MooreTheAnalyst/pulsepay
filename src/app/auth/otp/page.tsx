"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const OTP_LENGTH = 6;

export default function OTPPage() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(i: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < OTP_LENGTH - 1) inputs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/auth/pin");
  }

  const filled = digits.every(Boolean);

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <h1 className="mb-1 text-2xl font-bold">Verify your number</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        We sent a 6-digit code to <span className="font-medium text-foreground">+1 (555) 234-5678</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={cn(
                "h-12 w-12 rounded-xl border border-border bg-background text-center text-lg font-bold outline-none transition-all",
                "focus:border-primary focus:ring-2 focus:ring-primary/20",
                d && "border-primary"
              )}
            />
          ))}
        </div>

        <Button type="submit" className="w-full" disabled={!filled || loading}>
          {loading ? "Verifying…" : "Verify"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Didn&apos;t receive it?{" "}
        <button className="font-medium text-primary hover:underline">Resend code</button>
      </p>
    </div>
  );
}
