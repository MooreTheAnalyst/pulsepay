"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Share2, Check, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRCodeSVG } from "qrcode.react";
import { MOCK_USER } from "@/lib/mock-data";
import { truncateWalletId } from "@/lib/utils";
import { toast } from "sonner";

export default function ReceivePage() {
  const router = useRouter();
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  function copyToClipboard(text: string, type: "wallet" | "phone") {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "wallet") {
        setCopiedWallet(true);
        setTimeout(() => setCopiedWallet(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
      toast.success("Copied to clipboard");
    });
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: "PulsePay",
        text: `Send me money on PulsePay: ${MOCK_USER.phone}`,
      });
    } else {
      copyToClipboard(MOCK_USER.phone, "phone");
    }
  }

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="font-semibold">Receive Money</h1>
          <p className="text-xs text-muted-foreground">Share your details to receive payments</p>
        </div>
      </div>

      <Tabs defaultValue="qr">
        <TabsList className="w-full">
          <TabsTrigger value="qr" className="flex-1">QR Code</TabsTrigger>
          <TabsTrigger value="wallet" className="flex-1">Wallet ID</TabsTrigger>
        </TabsList>

        {/* QR Tab */}
        <TabsContent value="qr" className="mt-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="rounded-2xl bg-white p-4">
                <QRCodeSVG
                  value={`pulsepay:${MOCK_USER.walletId}`}
                  size={200}
                  level="M"
                  includeMargin={false}
                />
              </div>
              <div className="mt-4 text-center">
                <p className="font-semibold">{MOCK_USER.name}</p>
                <p className="text-sm text-muted-foreground">{MOCK_USER.phone}</p>
                <Badge variant="secondary" className="mt-2 text-xs">PulsePay · Stellar</Badge>
              </div>
            </div>
          </motion.div>

          <p className="text-center text-sm text-muted-foreground">
            Ask the sender to scan this QR code with their PulsePay app
          </p>

          <Button className="w-full gap-2" onClick={handleShare}>
            <Share2 className="h-4 w-4" /> Share QR code
          </Button>
        </TabsContent>

        {/* Wallet ID Tab */}
        <TabsContent value="wallet" className="mt-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Phone number */}
            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Phone number</p>
                <Badge variant="secondary" className="text-xs">Recommended</Badge>
              </div>
              <p className="text-xl font-bold">{MOCK_USER.phone}</p>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => copyToClipboard(MOCK_USER.phone, "phone")}
              >
                {copiedPhone ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                {copiedPhone ? "Copied!" : "Copy phone number"}
              </Button>
            </div>

            {/* Stellar wallet ID */}
            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Stellar wallet ID</p>
                <Badge variant="outline" className="text-xs">Advanced</Badge>
              </div>
              <p className="break-all font-mono text-sm text-muted-foreground">{MOCK_USER.walletId}</p>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => copyToClipboard(MOCK_USER.walletId, "wallet")}
              >
                {copiedWallet ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                {copiedWallet ? "Copied!" : "Copy wallet ID"}
              </Button>
            </div>

            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 text-sm text-amber-800 dark:text-amber-300">
              ⚠️ Only share your wallet ID with trusted senders. Only accept USDC on Stellar network.
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
