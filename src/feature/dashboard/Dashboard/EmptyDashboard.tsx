import { type User } from "../../../models/User";

interface EmptyDashboardProps {
  user: User;
  onCreateAccount: () => void;
}

export function EmptyDashboard({ user, onCreateAccount }: EmptyDashboardProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Welcome, {user.userInfo.name}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
        You don’t have any accounts yet. Create your first one to start using Grimluk banking.
      </p>

      <button
        onClick={onCreateAccount}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-lg font-medium"
      >
        + Create New Account
      </button>
    </div>
  );
}
