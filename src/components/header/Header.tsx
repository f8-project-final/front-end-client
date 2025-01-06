import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const nav = useNavigate();
  const [user, setUser]: any = useState({});
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      const localUser = {};
      setUser(localUser);
    } else {
      const localUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(localUser);
    }
  }, []);
  function handleLogout() {
    if (confirm("Logout?")) {
      localStorage.setItem("user", "{}");
      setUser({});
      nav("/login");
    }
  }
  return (
    <header className="flex items-center justify-between p-3 border-b">
      <div>
        <Link className="font-bold text-xl" to="/">
          My Friend App
        </Link>
      </div>
      <div>
        {user && user.email && (
          <div>
            <span>Hello {user.email?.split("@")[0]}</span>
            <button
              className="p-2 bg-black text-white rounded-md ml-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
