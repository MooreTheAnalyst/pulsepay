export type TransactionStatus = "completed" | "pending" | "failed";
export type TransactionType = "send" | "receive";

export interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: string;
  recipientName: string;
  recipientPhone: string;
  recipientAvatar?: string;
  note?: string;
  fee: number;
  exchangeRate?: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  walletId: string;
  balance: number;
  currency: string;
  country: string;
  kycVerified: boolean;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  fee: number;
  updatedAt: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}
