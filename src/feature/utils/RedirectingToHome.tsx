import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthenticationContext";

// ---------------------

export function RedirectingToHome() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      logout();          // clear auth / JWT
      navigate("/", { replace: true }); // redirect to home
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // cleanup if component unmounts
  }, [logout, navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-center text-gray-700 dark:text-gray-200">
      <p>
        You are not logged in. Redirecting to home...
        <br />
        Logging out for security.
      </p>
    </div>
  );
}
