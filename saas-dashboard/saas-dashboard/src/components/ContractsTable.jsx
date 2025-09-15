import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

export default function ContractsTable(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(()=>{
    setLoading(true);
    fetch("/contracts.json")
      .then(r => r.json())
      .then(j => { setData(j); setLoading(false); })
      .catch(e => { setError("Failed to load"); setLoading(false); });
  }, []);

  const filtered = data.filter(c=>{
    if (statusFilter && c.status !== statusFilter) return false;
    if (riskFilter && c.risk !== riskFilter) return false;
    const q = search.toLowerCase();
    if (q && !(c.name.toLowerCase().includes(q) || c.parties.toLowerCase().includes(q))) return false;
    return true;
  });

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const list = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (data.length === 0) return <div className="p-6">No contracts yet</div>;

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input value={search} onChange={e=>{setSearch(e.target.value); setPage(1)}}
               placeholder="Search name or parties" className="border p-2 rounded flex-1"/>
        <select value={statusFilter} onChange={e=>{setStatusFilter(e.target.value); setPage(1)}} className="border p-2 rounded">
          <option value="">All Status</option>
          <option>Active</option>
          <option>Expired</option>
          <option>Renewal Due</option>
        </select>
        <select value={riskFilter} onChange={e=>{setRiskFilter(e.target.value); setPage(1)}} className="border p-2 rounded">
          <option value="">All Risk</option>
          <option>Low</option><option>Medium</option><option>High</option>
        </select>
      </div>

      <table className="w-full table-auto border-collapse bg-white">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Contract Name</th>
            <th className="p-2">Parties</th>
            <th className="p-2">Expiry</th>
            <th className="p-2">Status</th>
            <th className="p-2">Risk</th>
          </tr>
        </thead>
        <tbody>
          {list.map(c => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="p-2"><Link className="text-blue-600" to={`/contracts/${c.id}`}>{c.name}</Link></td>
              <td className="p-2">{c.parties}</td>
              <td className="p-2">{c.expiry}</td>
              <td className="p-2">{c.status}</td>
              <td className="p-2"><span className="px-2 py-1 rounded bg-gray-100">{c.risk}</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm">Showing {list.length} of {filtered.length}</div>
        <div className="space-x-2">
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded">Prev</button>
          <span>{page} / {pages}</span>
          <button onClick={()=>setPage(p=>Math.min(pages,p+1))} className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
