import React, { useState, type ChangeEvent } from "react";
import { registerUser } from "../api/user-service";

type AuthProps = {
    toggleForm: () => void;
};

export function Register({ toggleForm }: AuthProps) {
    const [prefix, setPrefix] = useState("");
    const [phone, setPhone] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await registerUser({ email, password});
        setMessage("Registration successful! You can now login.");
      } catch (err: any) {
        setMessage(err.response?.data?.detail || "Registration failed");
      }
    };

    const handlePrefixChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
    
        // Remove any '+' inside the digits
        value = value.replace(/\+/g, "");
    
        // Keep only first 3 digits
        const digits = value.replace(/\D/g, "").slice(0, 2);
    
        // Always prepend '+'
        setPrefix("+" + digits);
      };

      const handlePhonechange = (e: ChangeEvent<HTMLInputElement>) => {
        // Keep only digits
        const digitsOnly = e.target.value.replace(/\D/g, "");
        const digits = digitsOnly.replace(/\D/g, "").slice(0, 11);

        setPhone(digits);
      };


  
    return (
      <form onSubmit={handleRegister} className="flex flex-col gap-3">

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />

        <div className="flex items-center gap-2">

        <input
          type="prefix"
          placeholder="+39"
          value={prefix}
          onChange={handlePrefixChange}
          className="p-2 border rounded w-[12ch] "
          
          required
        />
        <input
          type="phone"
          placeholder="Phone number"
          value={phone}
          onChange={handlePhonechange}
          className="p-2 border rounded"
          required
        />
        </div>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
<button
  type="submit"
  className="
    inline-block
    bg-green-600 
    text-white 
    p-2 
    rounded 
    hover:bg-green-700 
    focus:outline-none 
    focus-visible:ring-2 
    focus-visible:ring-green-500 
    focus-visible:ring-offset-2
  "
>
  Register
</button>

        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-600 underline"
            onClick={toggleForm}
          >
            Login
          </button>
        </p>
        {message && <p className="text-red-400">{message}</p>}
      </form>
    );
  }