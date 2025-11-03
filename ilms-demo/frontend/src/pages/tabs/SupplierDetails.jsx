import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export default function SupplierDetails(){
  const [suppliers, setSuppliers] = useState([]);
  useEffect(()=>{ api.suppliers.list().then(setSuppliers).catch(()=>setSuppliers([])); },[]);
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {suppliers.map(s => (
        <div key={s.id} className="bg-white rounded shadow p-4 flex gap-6">
          <div className="w-28 h-20 bg-orange-100 rounded" />
          <div className="flex-1">
            <div className="font-semibold mb-2">Supplier {s.id}</div>
            <table className="w-full text-sm">
              <tbody>
                <tr><td className="py-1 pr-4 text-slate-500">Supplier Name</td><td>{s.name}</td></tr>
                <tr><td className="py-1 pr-4 text-slate-500">Contact Details</td><td>{s.phone}</td></tr>
                <tr><td className="py-1 pr-4 text-slate-500">City</td><td>{s.city}</td></tr>
                <tr><td className="py-1 pr-4 text-slate-500">State</td><td>{s.state}</td></tr>
                <tr><td className="py-1 pr-4 text-slate-500">Country</td><td>{s.country}</td></tr>
                <tr><td className="py-1 pr-4 text-slate-500">Lead Time</td><td>{s.leadTimeDays} Days</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
