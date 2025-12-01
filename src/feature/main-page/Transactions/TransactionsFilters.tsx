import type { Account } from "../../../models/User";
import type { FlowFilter, SortField, SortDir } from "./TransactionsList";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

interface Props {
  accounts: Account[];
  accountFilter: string | "all";
  flowFilter: FlowFilter;
  sortField: SortField;
  sortDir: SortDir;
  search: string;
  onAccountChange: (v: string | "all") => void;
  onFlowChange: (v: FlowFilter) => void;
  onSortChange: (v: SortField) => void;
  onDirChange: (v: SortDir) => void;
  onSearch: (v: string) => void;
}

export default function TransfersFilters(props: Props) {
  const inputClass =
    "w-full px-3 py-2 rounded-lg text-sm border transition " +
    "bg-gray-50 dark:bg-gray-800 " +
    "border-gray-300 dark:border-gray-700 " +
    "text-gray-900 dark:text-gray-100 " +
    "focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 backdrop-blur 
                    border-b dark:border-gray-700 p-4">

      {/* WRAPPER: HALF WIDTH */}
      <div className="max-w-[50%] space-y-4">

        {/* LABEL */}
        <p className="text-xs uppercase tracking-wide text-gray-400">
          Filters & Sorting
        </p>

        {/* CONTROLS GRID */}
        <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">

          {/* ACCOUNT SELECT */}
          <select
            value={props.accountFilter}
            onChange={e => props.onAccountChange(e.target.value as any)}
            className={inputClass}
          >
            <option value="all">All accounts</option>
            {props.accounts.map(a => (
              <option key={a.id} value={a.account_number}>
                {a.account_type} • {a.account_number}
              </option>
            ))}
          </select>

          {/* SORT FIELD */}
          <select
            value={props.sortField}
            onChange={e => props.onSortChange(e.target.value as SortField)}
            className={inputClass}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>

          {/* SORT DIRECTION BUTTON */}
          <button
            onClick={() =>
              props.onDirChange(props.sortDir === "asc" ? "desc" : "asc")
            }
            className="!bg-transparent p-2 text-gray-400 hover:text-green-500 transition"
            title="Flip sort order"
          >
            {props.sortDir === "asc" ? <FaArrowUp /> : <FaArrowDown />}
          </button>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search description or account..."
          value={props.search}
          onChange={e => props.onSearch(e.target.value)}
          className={`${inputClass}`}
        />

        {/* FLOW TABS */}
        <div className="flex gap-4 pt-2">

          <p className="text-xs uppercase tracking-wide text-gray-400 self-center">
            Flow:
          </p>

          {["all", "positive", "negative", "flat"].map(flow => (
            <button
              key={flow}
              onClick={() => props.onFlowChange(flow as FlowFilter)}
              className={`text-sm font-medium transition
                ${props.flowFilter === flow
                  ? "text-green-500"
                  : "text-gray-400 hover:text-green-400"
                }`}
            >
              {flow.toUpperCase()}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
