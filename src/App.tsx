import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      <div className="p-6 dark">
        <Outlet />
      </div>
    </div>
  );
}
