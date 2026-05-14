"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </span>
          PulsePay
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it works</Link>
          <ThemeToggle />
          <Link href="/auth/sign-in">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button size="sm">Get started</Button>
          </Link>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="p-1">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            <Link href="#features" onClick={() => setOpen(false)} className="text-muted-foreground">Features</Link>
            <Link href="#how-it-works" onClick={() => setOpen(false)} className="text-muted-foreground">How it works</Link>
            <Link href="/auth/sign-in" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full">Sign in</Button>
            </Link>
            <Link href="/auth/sign-up" onClick={() => setOpen(false)}>
              <Button className="w-full">Get started</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
