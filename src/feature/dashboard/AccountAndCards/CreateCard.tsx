// src/components/dashboard/CreateAccountCard.tsx
interface CreateAccountCardProps {
  onClick: () => void;
}

export function CreateAccountCard({ onClick }: CreateAccountCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col justify-center items-center dark:bg-gray-800 border-2 border-dashed border-green-500 dark:border-green-400 rounded-2xl shadow-sm hover:shadow-md hover:border-green-600 dark:hover:border-green-300 p-8 transition-all duration-300"
    >
      {/* Plus icon circle */}
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 dark:bg-green-900">
        <span className="text-4xl text-green-600 dark:text-green-400">+</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
        Create a new account
      </h3>

      {/* Subtitle */}
      <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
        Open a checking or savings account
      </p>
    </div>
  );
}
