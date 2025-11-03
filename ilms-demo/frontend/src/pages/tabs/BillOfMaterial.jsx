import { useState } from 'react';

export default function BillOfMaterial(){
  const [rows, setRows] = useState([
    { id:1, type:'Coal', group:'Packed Cement', cls:'PPC', qty:10, uom:'TON', prod:'Self Manufacturing', inv:'Direct Factor' },
  ]);
  const [form, setForm] = useState({ type:'', group:'', cls:'', qty:'', uom:'TON', prod:'Self Manufacturing', inv:'Direct Factor' });

  function add(){
    if(!form.type) return;
    setRows(r=>[...r, { id: Date.now(), ...form, qty: Number(form.qty)||0 }]);
    setForm({ type:'', group:'', cls:'', qty:'', uom:'TON', prod:'Self Manufacturing', inv:'Direct Factor' });
  }
  function remove(id){ setRows(r=>r.filter(x=>x.id!==id)); }

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="grid md:grid-cols-5 gap-2 mb-3">
        <input placeholder="Material Type" className="border rounded px-2 py-1" value={form.type} onChange={e=>setForm({...form,type:e.target.value})} />
        <input placeholder="Material Group" className="border rounded px-2 py-1" value={form.group} onChange={e=>setForm({...form,group:e.target.value})} />
        <input placeholder="Material Class" className="border rounded px-2 py-1" value={form.cls} onChange={e=>setForm({...form,cls:e.target.value})} />
        <input placeholder="Quantity" className="border rounded px-2 py-1" value={form.qty} onChange={e=>setForm({...form,qty:e.target.value})} />
        <button className="bg-sky-600 text-white rounded px-3" onClick={add}>Add</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">Material Type</th><th>Material Group</th><th>Material Class</th><th>Quantity</th><th>Measuring Units</th><th>Production Type</th><th>Involvement Type</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r=> (
              <tr key={r.id} className="border-t">
                <td className="py-2">{r.type}</td>
                <td>{r.group}</td>
                <td>{r.cls}</td>
                <td>{r.qty}</td>
                <td>{r.uom}</td>
                <td>{r.prod}</td>
                <td>{r.inv}</td>
                <td><button className="text-rose-600" onClick={()=>remove(r.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
