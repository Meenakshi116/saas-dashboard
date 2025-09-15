import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function ContractDetail(){
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  useEffect(()=>{
    setLoading(true);
    fetch(`/contracts/${id}.json`)
      .then(r => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then(j => { setData(j); setLoading(false); })
      .catch(()=> setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!data) return <div className="p-6">Contract not found</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-6">
        <Link to="/dashboard" className="text-sm text-blue-600">← Back to contracts</Link>
        <div className="flex justify-between items-start mt-4">
          <div>
            <h2 className="text-2xl">{data.name}</h2>
            <div className="text-sm text-gray-500">{data.parties}</div>
          </div>
          <div className="text-right">
            <div>Status: <strong>{data.status}</strong></div>
            <div>Risk: <strong>{data.risk}</strong></div>
            <div>Expiry: {data.expiry}</div>
          </div>
        </div>

        <section className="mt-6">
          <h3 className="font-semibold">Clauses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            {data.clauses.map((c,i)=>(
              <div key={i} className="p-4 border rounded bg-white">
                <div className="font-medium">{c.title}</div>
                <div className="text-sm text-gray-600">{c.summary}</div>
                <div className="text-xs mt-2">Confidence: {(c.confidence*100).toFixed(0)}%</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h3 className="font-semibold">AI Insights</h3>
          <ul className="mt-2 space-y-2">
            {data.insights.map((ins,i)=>(
              <li key={i} className="p-3 border rounded bg-white flex justify-between">
                <div>{ins.message}</div>
                <div className={`px-2 py-1 rounded text-xs ${ins.risk==='High' ? 'bg-red-200' : ins.risk==='Medium' ? 'bg-yellow-200' : 'bg-green-200'}`}>{ins.risk}</div>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6">
          <button onClick={()=>setEvidenceOpen(true)} className="px-3 py-1 border rounded">Open Evidence</button>
        </div>
      </div>

      {evidenceOpen && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow p-4 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h4>Evidence</h4>
            <button onClick={()=>setEvidenceOpen(false)}>Close</button>
          </div>
          {data.evidence.map((ev,i)=>(
            <div key={i} className="mb-3">
              <div className="text-sm font-medium">{ev.source}</div>
              <div className="text-xs text-gray-600">{ev.snippet}</div>
              <div className="text-xs mt-1">Relevance: {(ev.relevance*100).toFixed(0)}%</div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
