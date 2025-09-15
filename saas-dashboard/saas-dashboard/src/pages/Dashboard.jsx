import React from "react";
import ContractsTable from "../components/ContractsTable";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Dashboard(){
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 flex-1">
          <h1 className="text-xl mb-4">Contracts</h1>
          <ContractsTable />
        </main>
        <Footer />
      </div>
    </div>
  );
}
