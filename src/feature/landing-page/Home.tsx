import { useState } from "react";
import {Login} from "./Login"
import {Register} from "./Register"
import { motion, AnimatePresence } from "framer-motion";



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
          <div className="p-4 relative">
            <AnimatePresence mode="wait">
              {showLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Login toggleForm={toggleForm} />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Register toggleForm={toggleForm} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
