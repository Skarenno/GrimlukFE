import { useState } from "react";
import { registerUser } from "../api/user-service";

type AuthProps = {
    toggleForm: () => void;
};

export function Register({ toggleForm }: AuthProps) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
  
    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await registerUser({ username, email, password });
        setMessage("Registration successful! You can now login.");
      } catch (err: any) {
        setMessage(err.response?.data?.detail || "Registration failed");
      }
    };
  
    return (
      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
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
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            className="text-green-600 underline"
            onClick={toggleForm}
          >
            Login
          </button>
        </p>
        {message && <p className="text-red-600">{message}</p>}
      </form>
    );
  }