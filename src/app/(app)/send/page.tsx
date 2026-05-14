"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, CheckCircle2, Delete, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MOCK_EXCHANGE_RATES, CURRENCIES, MOCK_USER } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";

type Step = "recipient" | "amount" | "review" | "pin" | "success";

const STEPS: Step[] = ["recipient", "amount", "review", "pin", "success"];
const STEP_LABELS = ["Recipient", "Amount", "Review", "Confirm", "Done"];

const PIN_LENGTH = 6;
const KEYPAD = ["1","2","3","4","5","6","7","8","9","","0","⌫"];

const slideVariants = {
  enter: { x: 40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -40, opacity: 0 },
};

export default function SendPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("recipient");
  const [phone, setPhone] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [toCurrency, setToCurrency] = useState("PHP");
  const [pin, setPin] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const stepIndex = STEPS.indexOf(step);
  const rate = MOCK_EXCHANGE_RATES.find((r) => r.to === toCurrency);
  const numAmount = parseFloat(amount) || 0;
  const fee = rate ? rate.fee : 0.5;
  const converted = rate ? numAmount * rate.rate : 0;

  function next() {
    setStep(STEPS[stepIndex + 1]);
  }

  function back() {
    if (stepIndex === 0) router.back();
    else setStep(STEPS[stepIndex - 1]);
  }

  function handlePhoneSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRecipientName("Maria Santos"); // mock lookup
    next();
  }

  function handleAmountSubmit(e: React.FormEvent) {
    e.preventDefault();
    next();
  }

  async function handlePinKey(k: string) {
    if (k === "⌫") { setPin((p) => p.slice(0, -1)); return; }
    if (!k || pin.length >= PIN_LENGTH) return;
    const next = [...pin, k];
    setPin(next);
    if (next.length === PIN_LENGTH) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1200));
      setStep("success");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col px-4 py-6">
      {/* Header */}
      {step !== "success" && (
        <div className="mb-6 flex items-center gap-3">
          <button onClick={back} className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold">Send Money</h1>
            <p className="text-xs text-muted-foreground">Step {stepIndex + 1} of {STEPS.length - 1}</p>
          </div>
        </div>
      )}

      {/* Progress bar */}
      {step !== "success" && (
        <div className="mb-6 flex gap-1.5">
          {STEPS.slice(0, -1).map((s, i) => (
            <div
              key={s}
              className={cn(
                "h-1 flex-1 rounded-full transition-all",
                i <= stepIndex ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25 }}
          className="flex-1"
        >
          {/* Step 1: Recipient */}
          {step === "recipient" && (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div>
                <h2 className="mb-1 text-xl font-bold">Who are you sending to?</h2>
                <p className="text-sm text-muted-foreground">Enter their phone number</p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+63 912 345 6789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="text-base"
                />
              </div>
              {/* Recent contacts */}
              <div>
                <p className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Recent</p>
                <div className="space-y-2">
                  {[
                    { name: "Maria Santos", phone: "+63 912 345 6789", flag: "🇵🇭" },
                    { name: "James Okafor", phone: "+234 801 234 5678", flag: "🇳🇬" },
                  ].map((c) => (
                    <button
                      key={c.phone}
                      type="button"
                      onClick={() => { setPhone(c.phone); setRecipientName(c.name); }}
                      className="flex w-full items-center gap-3 rounded-xl border border-border bg-card p-3 text-left transition-colors hover:bg-muted/50"
                    >
                      <span className="text-2xl">{c.flag}</span>
                      <div>
                        <p className="text-sm font-medium">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.phone}</p>
                      </div>
                      <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={!phone}>
                Continue
              </Button>
            </form>
          )}

          {/* Step 2: Amount */}
          {step === "amount" && (
            <form onSubmit={handleAmountSubmit} className="space-y-6">
              <div>
                <h2 className="mb-1 text-xl font-bold">How much?</h2>
                <p className="text-sm text-muted-foreground">Sending to {recipientName}</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4 space-y-4">
                <div className="space-y-1.5">
                  <Label>You send (USD)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                    <Input
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-7 text-xl font-bold"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Balance: {formatCurrency(MOCK_USER.balance)}</p>
                </div>

                <Separator />

                {/* Exchange rate card */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label>They receive</Label>
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="rounded-lg border border-border bg-background px-2 py-1 text-xs outline-none"
                    >
                      {MOCK_EXCHANGE_RATES.map((r) => (
                        <option key={r.to} value={r.to}>{r.to}</option>
                      ))}
                    </select>
                  </div>
                  <div className="rounded-xl bg-muted/50 px-4 py-3">
                    <p className="text-2xl font-bold">
                      {converted > 0 ? converted.toLocaleString("en-US", { maximumFractionDigits: 2 }) : "0.00"}{" "}
                      <span className="text-base font-normal text-muted-foreground">{toCurrency}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <RefreshCw className="h-3 w-3" />
                    Rate: 1 USD = {rate?.rate ?? "—"} {toCurrency}
                  </span>
                  <Badge variant="secondary" className="text-[10px]">Live</Badge>
                </div>
              </div>

              {/* Fee breakdown */}
              <div className="rounded-xl border border-border bg-card p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transfer fee</span>
                  <span>${fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exchange rate</span>
                  <span>1 USD = {rate?.rate ?? "—"} {toCurrency}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total deducted</span>
                  <span>{formatCurrency(numAmount + fee)}</span>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={!amount || numAmount <= 0}>
                Review transfer
              </Button>
            </form>
          )}

          {/* Step 3: Review */}
          {step === "review" && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-1 text-xl font-bold">Review transfer</h2>
                <p className="text-sm text-muted-foreground">Please confirm the details below</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
                <div className="text-center">
                  <p className="text-4xl font-bold">{formatCurrency(numAmount)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    → {converted.toLocaleString("en-US", { maximumFractionDigits: 2 })} {toCurrency}
                  </p>
                </div>
                <Separator />
                {[
                  { label: "To", value: recipientName },
                  { label: "Phone", value: phone },
                  { label: "Fee", value: `$${fee.toFixed(2)}` },
                  { label: "Rate", value: `1 USD = ${rate?.rate} ${toCurrency}` },
                  { label: "Total", value: formatCurrency(numAmount + fee) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full" onClick={next}>
                Confirm &amp; enter PIN
              </Button>
            </div>
          )}

          {/* Step 4: PIN */}
          {step === "pin" && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="mb-1 text-xl font-bold">Enter your PIN</h2>
                <p className="text-sm text-muted-foreground">Confirm with your 6-digit PIN</p>
              </div>

              <div className="flex justify-center gap-3 py-4">
                {Array.from({ length: PIN_LENGTH }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-3 w-3 rounded-full border-2 transition-all",
                      i < pin.length ? "border-primary bg-primary scale-110" : "border-muted-foreground/30"
                    )}
                  />
                ))}
              </div>

              {loading && <p className="text-center text-sm text-muted-foreground">Processing transfer…</p>}

              <div className="grid grid-cols-3 gap-3">
                {KEYPAD.map((k, i) => (
                  <button
                    key={i}
                    onClick={() => handlePinKey(k)}
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
            </div>
          )}

          {/* Step 5: Success */}
          {step === "success" && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30"
              >
                <CheckCircle2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-bold">Money sent!</h2>
                <p className="mt-2 text-muted-foreground">
                  {formatCurrency(numAmount)} sent to {recipientName}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  They&apos;ll receive {converted.toLocaleString("en-US", { maximumFractionDigits: 2 })} {toCurrency}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full space-y-3"
              >
                <Button className="w-full" onClick={() => router.push("/dashboard")}>
                  Back to home
                </Button>
                <Button variant="outline" className="w-full" onClick={() => { setStep("recipient"); setPin([]); setAmount(""); setPhone(""); }}>
                  Send again
                </Button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
