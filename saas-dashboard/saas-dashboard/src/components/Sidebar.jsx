import React from "react";

export default function Sidebar(){
  return (
    <aside className="w-56 bg-white border-r p-4 hidden md:block">
      <div className="text-xl font-semibold mb-4">Meenakshi</div>
      <nav className="space-y-2 text-sm">
        <div className="p-2 rounded bg-gray-100">Dashboard</div>
        <div className="p-2 rounded hover:bg-gray-50">Contracts</div>
        <div className="p-2 rounded hover:bg-gray-50">Upload</div>
      </nav>
    </aside>
  );
}
