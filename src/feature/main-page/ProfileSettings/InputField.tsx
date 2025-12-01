export function InputField({
  label,
  name,
  value,
  onChange,
  disabled,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
          ${disabled ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed" : "dark:bg-gray-700"}
          ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
        `}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}