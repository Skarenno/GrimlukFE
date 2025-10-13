import { FaPlusCircle} from "react-icons/fa";
  
export function EmptyDashboard() {
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-300">
      <h2 className="text-3xl font-semibold mb-4 text-green-700 dark:text-green-400">
        Benvenuto su Grimluk Bank
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Sembra che tu non abbia ancora un conto aperto.
        <br />
        Richiedi ora il tuo conto corrente sulla nostra piattaforma!
      </p>
      <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
        <FaPlusCircle className="text-xl" /> Apri un nuovo conto
      </button>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
        In pochi minuti potrai creare un conto corrente, aggiungere carte, e
        iniziare a gestire le tue finanze in sicurezza.
      </p>
    </div>
  );
}