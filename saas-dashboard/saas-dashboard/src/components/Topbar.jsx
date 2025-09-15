import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Topbar(){
  const { logout } = useContext(AuthContext);
  return (
    <div className="bg-white p-4 flex justify-between items-center border-b">
      <div className="font-semibold">SaaS Contracts</div>
      <div className="flex items-center gap-4">
        <button onClick={logout} className="text-sm text-red-500">Logout</button>
      </div>
    </div>
  );
}
