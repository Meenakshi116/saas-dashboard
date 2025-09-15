import React, { useState } from "react";

export default function UploadModal({ open, onClose }){
  const [files, setFiles] = useState([]);

  const onFiles = (fileList) => {
    const arr = Array.from(fileList).map(f => ({ file: f, status: "Uploading" }));
    setFiles(prev => [...prev, ...arr]);

    arr.forEach((item) => {
      setTimeout(()=>{
        const ok = Math.random() > 0.1;
        setFiles(prev => prev.map(p => p.file === item.file ? { ...p, status: ok ? "Success" : "Error" } : p));
      }, 800 + Math.random()*1200);
    });
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[600px]">
        <h3 className="mb-2">Upload files</h3>
        <div className="border-dashed border-2 p-6 text-center" 
             onDrop={(e)=>{ e.preventDefault(); onFiles(e.dataTransfer.files);} }
             onDragOver={(e)=>e.preventDefault()}>
          <div>Drag & drop files here or <label className="text-blue-600 cursor-pointer"><input type="file" onChange={e=>onFiles(e.target.files)} className="hidden" /> browse</label></div>
        </div>

        <div className="mt-4">
          {files.map((f,i)=>(
            <div key={i} className="flex justify-between items-center py-2 border-b">
              <div>{f.file.name}</div>
              <div className={`text-sm ${f.status==="Success" ? "text-green-600" : f.status==="Error" ? "text-red-600" : "text-gray-600"}`}>{f.status}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">Close</button>
        </div>
      </div>
    </div>
  );
}
