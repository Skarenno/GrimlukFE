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
      </div>

      {/* Right side: Auth form */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md border rounded shadow">
        <div className="flex-1 flex items-center border-b-2 justify-center ">
          <h2 className="text-4xl font-bold p-6 text-green-700">Grimluk Finance&Banking</h2>
        </div>
        <div className="p-12">
          {showLogin ? <Login toggleForm={toggleForm} /> : <Register toggleForm={toggleForm} />}
          </div>
        </div>
      </div>
    </div>
  );
}
