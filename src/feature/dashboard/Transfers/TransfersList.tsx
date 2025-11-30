import { useMemo, useState } from "react";
import type { Transaction, Account } from "../../../models/User";
import TransfersFilters from "./TransfersFilters";
import TransfersGrid from "./TransfersGrid";

export type FlowFilter = "all" | "in" | "out" | "flat";
export type SortField = "date" | "amount";
export type SortDir = "asc" | "desc";

interface Props {
  transactions: Transaction[];
  accounts: Account[];
}

export default function TransfersList({ transactions, accounts }: Props) {
  const [accountFilter, setAccountFilter] = useState<string | "all">("all");
  const [flowFilter, setFlowFilter] = useState<FlowFilter>("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [search, setSearch] = useState("");

  /* ================================
     FILTER + SORT PIPELINE
  ================================= */
  const filtered = useMemo(() => {
    let data = [...transactions];

    if (accountFilter !== "all") {
      data = data.filter(
        t =>
          t.s_account_number === accountFilter ||
          t.r_account_number === accountFilter
      );
    }

    if (flowFilter !== "all") {
      data = data.filter(t => t.direction == flowFilter.toUpperCase());
    }

    // Search
    if (search.trim()) {
      const term = search.toLowerCase();
      data = data.filter(t =>
        t.description?.toLowerCase().includes(term) ||
        t.r_account_number?.toLowerCase().includes(term)
      );
    }

    // Sorting
    data.sort((a, b) => {
      let v1: number, v2: number;

      if (sortField === "amount") {
        v1 = a.amount;
        v2 = b.amount;
      } else {
        v1 = new Date(a.created_at).getTime();
        v2 = new Date(b.created_at).getTime();
      }

      return sortDir === "asc" ? v1 - v2 : v2 - v1;
    });

    return data;
  }, [transactions, accountFilter, flowFilter, sortField, sortDir, search]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow overflow-hidden">

      <TransfersFilters
        accounts={accounts}
        accountFilter={accountFilter}
        flowFilter={flowFilter}
        sortField={sortField}
        sortDir={sortDir}
        search={search}
        onAccountChange={setAccountFilter}
        onFlowChange={setFlowFilter}
        onSortChange={setSortField}
        onDirChange={setSortDir}
        onSearch={setSearch}
      />

      <TransfersGrid transactions={filtered} />
    </div>
  );
}
