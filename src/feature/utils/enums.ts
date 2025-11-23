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
