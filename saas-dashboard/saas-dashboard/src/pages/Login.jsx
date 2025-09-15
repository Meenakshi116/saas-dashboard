import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login(){
  const [user, setUser] = useState({ username: "", password: ""});
  const [err, setErr] = useState("");
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const res = login(user);
    if (res.ok) nav("/dashboard");
    else setErr(res.message || "Login failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl mb-4">Sign in</h2>
        <input value={user.username} onChange={e=>setUser({...user, username:e.target.value})}
               placeholder="Username" className="w-full p-2 mb-3 border rounded"/>
        <input value={user.password} onChange={e=>setUser({...user, password:e.target.value})}
               placeholder="Password" type="password" className="w-full p-2 mb-3 border rounded"/>
        {err && <div className="text-red-600 mb-2">{err}</div>}
        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
        <div className="text-sm mt-2 text-gray-600">Use any username and password <strong>test123</strong>.</div>
        <div className="text-sm mt-2 text-gray-500">Or open <code>?demo=true</code> on the deployed URL to bypass login for the demo.</div>
      </form>
    </div>
  );
}
