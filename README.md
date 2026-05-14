# PulsePay

A cross-border payment app built on Stellar. Send money using just a phone number.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**
- **Framer Motion**
- **Lucide Icons**
- **qrcode.react**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/auth/sign-in` | Sign in |
| `/auth/sign-up` | Create account |
| `/auth/otp` | OTP verification |
| `/auth/pin` | PIN creation |
| `/dashboard` | Wallet dashboard |
| `/send` | Send money (multi-step) |
| `/receive` | Receive money / QR code |
| `/history` | Transaction history |
| `/settings` | Settings |

## Project Structure

```
src/
├── app/
│   ├── (app)/          # Authenticated app routes
│   │   ├── dashboard/
│   │   ├── send/
│   │   ├── receive/
│   │   ├── history/
│   │   └── settings/
│   ├── auth/           # Auth screens
│   └── page.tsx        # Landing page
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── app-shell.tsx
│   ├── bottom-nav.tsx
│   ├── navbar.tsx
│   ├── theme-toggle.tsx
│   ├── theme-provider.tsx
│   └── transaction-card.tsx
└── lib/
    ├── types.ts
    ├── mock-data.ts
    └── utils.ts
```

## Deploy

Deploy on Vercel with zero configuration:

```bash
vercel deploy
```
