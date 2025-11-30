export const AccountStatus = {
    Active: "active",
    Deleted: "deleted",

};
export type AccountStatusType = typeof AccountStatus[keyof typeof AccountStatus];

export const CardStatus = {
  Active: "active",
  Blocked: "blocked",
  Expired: "expired"
} as const;

export type CardStatusType = typeof CardStatus[keyof typeof CardStatus];

export const TransactionStatus = {
  PENDING: "PENDING",
  VALIDATED: "VALIDATED",
  REJECTED: "REJECTED"
}

export type TransactionStatusType = typeof TransactionStatus[keyof typeof TransactionStatus];
