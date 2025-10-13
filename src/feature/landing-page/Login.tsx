import { useState } from "react";
import { loginUser } from "../../api/user/user-service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthenticationContext";


type AuthProps = {
  toggleForm: () => void;
};

export function Login({ toggleForm }: AuthProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({ username, password });
      login(res.data.jwt_token)

      alert("Login successful!");
      navigate("/dashboard", {"replace" : true} );
    } catch (err: any) {
      setMessage(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
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
        className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Login
      </button>
      <p className="text-sm text-gray-600">
        Don’t have an account?{" "}
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={toggleForm}
        >
          Register
        </button>
      </p>
      {message && <p className="text-red-600">{message}</p>}
    </form>
  );
}
