import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import type { Account } from "../../../models/User";
import type { FlowFilter, SortField, SortDir } from "./TransfersList";

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
    "w-full px-3 py-2 rounded-xl text-sm border transition " +
    "bg-gray-50 dark:bg-gray-800 " +
    "border-gray-300 dark:border-gray-700 " +
    "text-gray-900 dark:text-gray-100 " +
    "focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 backdrop-blur
                    border-b dark:border-gray-700 p-4 space-y-3">

      {/* SELECTORS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center">

        {/* ACCOUNT FILTER */}
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
        <div className="flex justify-left">
          <button
            type="button"
            onClick={() =>
              props.onDirChange(props.sortDir === "asc" ? "desc" : "asc")
            }
            title="Toggle sort direction"
            className="border-none shadow-none
                          p-0 m-0 inline-flex items-center justify-center 
                          text-gray-500 hover:text-green-400
                          focus:outline-none focus:ring-0 focus:ring-offset-0">
            {props.sortDir === "asc" ? <FaArrowUp /> : <FaArrowDown />}
          </button>
        </div>

      </div>

      {/* SEARCH */}
      <div className="flex">
        <input
          type="text"
          placeholder="Search by description or account…"
          value={props.search}
          onChange={e => props.onSearch(e.target.value)}
          className={`${inputClass} w-full md:w-1/2`}
        />
      </div>

      {/* FLOW FILTER TABS */}
      <div className="flex gap-2">
        {(["all", "positive", "negative", "flat"] as FlowFilter[]).map(flow => (
          <button
            key={flow}
            onClick={() => props.onFlowChange(flow)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition
              ${
                props.flowFilter === flow
                  ? "bg-green-600 text-white shadow"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-green-200 dark:hover:bg-green-800"
              }`}
          >
            {flow.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
