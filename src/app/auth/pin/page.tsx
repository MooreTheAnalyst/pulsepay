"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Delete } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PIN_LENGTH = 6;
const KEYPAD = ["1","2","3","4","5","6","7","8","9","","0","⌫"];

export default function PinPage() {
  const router = useRouter();
  const [pin, setPin] = useState<string[]>([]);
  const [confirm, setConfirm] = useState<string[]>([]);
  const [step, setStep] = useState<"create" | "confirm">("create");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const current = step === "create" ? pin : confirm;
  const setCurrent = step === "create" ? setPin : setConfirm;

  function handleKey(k: string) {
    if (k === "⌫") {
      setCurrent((p) => p.slice(0, -1));
      setError("");
      return;
    }
    if (!k || current.length >= PIN_LENGTH) return;
    const next = [...current, k];
    setCurrent(next);

    if (next.length === PIN_LENGTH) {
      if (step === "create") {
        setTimeout(() => setStep("confirm"), 300);
      } else {
        if (next.join("") !== pin.join("")) {
          setError("PINs don't match. Try again.");
          setConfirm([]);
        } else {
          handleDone();
        }
      }
    }
  }

  async function handleDone() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/dashboard");
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <h1 className="mb-1 text-2xl font-bold">
        {step === "create" ? "Create your PIN" : "Confirm your PIN"}
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        {step === "create"
          ? "Choose a 6-digit PIN to secure your account"
          : "Enter your PIN again to confirm"}
      </p>

      {/* Dots */}
      <div className="mb-8 flex justify-center gap-3">
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-3 w-3 rounded-full border-2 transition-all",
              i < current.length
                ? "border-primary bg-primary scale-110"
                : "border-muted-foreground/30"
            )}
          />
        ))}
      </div>

      {error && <p className="mb-4 text-center text-sm text-destructive">{error}</p>}

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-3">
        {KEYPAD.map((k, i) => (
          <button
            key={i}
            onClick={() => handleKey(k)}
            disabled={!k || loading}
            className={cn(
              "flex h-14 items-center justify-center rounded-2xl text-lg font-semibold transition-all",
              k ? "bg-muted hover:bg-muted/70 active:scale-95" : "pointer-events-none",
              k === "⌫" && "text-muted-foreground"
            )}
          >
            {k === "⌫" ? <Delete className="h-5 w-5" /> : k}
          </button>
        ))}
      </div>

      {loading && (
        <p className="mt-6 text-center text-sm text-muted-foreground">Setting up your account…</p>
      )}
    </div>
  );
}
