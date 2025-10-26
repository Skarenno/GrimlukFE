export interface Account {
  name: string;
  balance: number;
  currency: string;
  lastUpdated?: string;
  type?: string;
}

export interface Card {
  name: string;
  last4: string;
  expiry: string;
}

export interface Transaction {
  date: string;
  description: string;
  amount: number;
}

export interface UserInfo {
  id: string;
  username: string;
  tax_code: string;
  name: string;
  surname: string;
  phone: string;
  gender?: string | null;
  residence_address_1?: string | null;
  residence_address_2?: string | null;
  city?: string | null;
  province?: string | null;
  postal_code?: string | null;
  country?: string | null;
}


export interface User {
  userInfo: UserInfo;
  accounts: Account[];
  cards: Card[];
  transactions: Transaction[];
}



export const mockUserEmpty: User = {
  userInfo: {
    id: "1",
    name: "Mario",
    surname: "Rossi",
    username: "mario.rossi@a.it",
    tax_code: "MRRSS023327894N",
    phone: "+39373737"
  },
  accounts: [],
  cards: [],
  transactions: [],
}


export const mockUserFilled: User = {
  userInfo: {
    id: "1",
    name: "Mario",
    surname: "Rossi",
    username: "mario.rossi@a.it",
    tax_code: "MRRSS023327894N",
    phone: "+39373737"
  },
  accounts: [
    {
      name: "Conto Corrente Principale",
      balance: 3245.67,
      currency: "€",
      lastUpdated: "2025-10-13",
      type: "Corrente",
    },
    {
      name: "Conto Risparmio",
      balance: 15890.45,
      currency: "€",
      lastUpdated: "2025-10-12",
      type: "Risparmio",
    },
  ],
  cards: [
    {
      name: "Visa Classic",
      last4: "1234",
      expiry: "12/25",
    },
    {
      name: "MasterCard Gold",
      last4: "5678",
      expiry: "06/24",
    },
  ],
  transactions: [
    {
      date: "2025-10-12",
      description: "Pagamento bolletta energia",
      amount: -75.5,
    },
    {
      date: "2025-10-10",
      description: "Ricarica cellulare",
      amount: -15.0,
    },
    {
      date: "2025-10-08",
      description: "Stipendio",
      amount: 2500.0,
    },
    {
      date: "2025-10-07",
      description: "Acquisto Amazon",
      amount: -120.99,
    },
    {
      date: "2025-10-06",
      description: "Bonifico ricevuto da Luca",
      amount: 500.0,
    },
  ],
};
