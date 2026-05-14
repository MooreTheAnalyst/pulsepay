"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  User, Shield, Bell, Palette, Smartphone, ChevronRight,
  LogOut, CheckCircle2, Lock, Fingerprint, Eye, Moon, Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MOCK_USER } from "@/lib/mock-data";
import { truncateWalletId } from "@/lib/utils";
import { toast } from "sonner";

function SettingRow({
  icon: Icon,
  label,
  desc,
  right,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  desc?: string;
  right?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/50 disabled:pointer-events-none"
      disabled={!onClick && !right}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{label}</p>
        {desc && <p className="text-xs text-muted-foreground truncate">{desc}</p>}
      </div>
      {right ?? (onClick && <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />)}
    </button>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    transfers: true,
    marketing: false,
    security: true,
  });
  const [biometrics, setBiometrics] = useState(false);

  const initials = MOCK_USER.name.split(" ").map((n) => n[0]).join("");

  return (
    <div className="px-4 py-6 space-y-6">
      <h1 className="text-xl font-bold">Settings</h1>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card p-5 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold">{MOCK_USER.name}</p>
              {MOCK_USER.kycVerified && (
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{MOCK_USER.phone}</p>
            <p className="text-xs text-muted-foreground truncate font-mono mt-0.5">
              {truncateWalletId(MOCK_USER.walletId)}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => toast.info("Edit profile coming soon")}>
            Edit
          </Button>
        </div>
        <div className="mt-4 flex gap-2">
          <Badge variant="secondary" className="text-xs gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-500" /> KYC Verified
          </Badge>
          <Badge variant="secondary" className="text-xs">🇺🇸 United States</Badge>
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5" /> Security
          </p>
        </div>
        <SettingRow
          icon={Lock}
          label="Change PIN"
          desc="Update your 6-digit transaction PIN"
          onClick={() => toast.info("Change PIN coming soon")}
        />
        <Separator />
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <Fingerprint className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Biometric unlock</p>
            <p className="text-xs text-muted-foreground">Use Face ID or fingerprint</p>
          </div>
          <Switch
            checked={biometrics}
            onCheckedChange={(v) => { setBiometrics(v); toast.success(v ? "Biometrics enabled" : "Biometrics disabled"); }}
          />
        </div>
        <Separator />
        <SettingRow
          icon={Eye}
          label="Privacy mode"
          desc="Hide balances on app open"
          onClick={() => toast.info("Privacy mode coming soon")}
        />
        <Separator />
        <SettingRow
          icon={Smartphone}
          label="Connected devices"
          desc="1 active device"
          onClick={() => toast.info("Device management coming soon")}
        />
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
            <Bell className="h-3.5 w-3.5" /> Notifications
          </p>
        </div>
        {(
          [
            { key: "transfers" as const, label: "Transfer alerts", desc: "Get notified on sends & receives" },
            { key: "security" as const, label: "Security alerts", desc: "Login attempts and suspicious activity" },
            { key: "marketing" as const, label: "Promotions", desc: "Tips, offers, and product updates" },
          ] as const
        ).map(({ key, label, desc }, i) => (
          <div key={key}>
            {i > 0 && <Separator />}
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="flex-1">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <Switch
                checked={notifications[key]}
                onCheckedChange={(v) => setNotifications((n) => ({ ...n, [key]: v }))}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
            <Palette className="h-3.5 w-3.5" /> Appearance
          </p>
        </div>
        <div className="p-4">
          <p className="mb-3 text-sm font-medium">Theme</p>
          <div className="grid grid-cols-3 gap-2">
            {(["light", "dark", "system"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-xs font-medium transition-all ${
                  theme === t ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                }`}
              >
                {t === "light" ? <Sun className="h-4 w-4" /> : t === "dark" ? <Moon className="h-4 w-4" /> : <Palette className="h-4 w-4" />}
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sign out */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          variant="outline"
          className="w-full gap-2 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/5"
          onClick={() => toast.error("Signed out (mock)")}
        >
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </motion.div>

      <p className="text-center text-xs text-muted-foreground pb-2">PulsePay v0.1.0 · Stellar Testnet</p>
    </div>
  );
}
