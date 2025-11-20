interface Props {
  label: string;
  value: string | number;
  alert?: boolean;
}

export default function DetailRow({ label, value, alert }: Props) {
  return (
    <div>
      <p>{label}:</p>
      <p
        className={`font-medium ${
          alert ? "text-red-500 dark:text-red-400" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
