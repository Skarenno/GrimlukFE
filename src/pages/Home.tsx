import { useState } from "react";
import {Login} from "../Components/Login"
import {Register} from "../Components/Register"


export default function Home() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => setShowLogin(!showLogin);

  return (
    <div className="flex">
      {/* Left side: App title */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold">🏦 Grimluk Finance&Banking</h1>
      </div>

      {/* Right side: Auth form */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-6 border rounded shadow">
          {showLogin ? <Login toggleForm={toggleForm} /> : <Register toggleForm={toggleForm} />}
        </div>
      </div>
    </div>
  );
}
