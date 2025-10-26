import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/user/user-service";
import { useAuth } from "../../context/AuthenticationContext";
import { useUser } from "../../context/UserContext";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useAuth(); // saves JWT
  const { setUser } = useUser(); // sets full user context
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({ username, password });

      login(res.data.jwt_token);
      setUser({
        userInfo: res.data.user,
        accounts: [],
        cards: [],
        transactions: [],
      });

      
      // Redirect to dashboard
      navigate("/dashboard", { replace: true });
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
        onChange={(e) => setUsername(e.target.value)}
        required
        className="p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="p-2 border rounded"
      />
      <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
        Login
      </button>
      {message && <p className="text-red-600">{message}</p>}
    </form>
  );
}
