import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export default function StorageLocation(){
  const [locs, setLocs] = useState([]);
  useEffect(()=>{ api.locations.list().then(setLocs).catch(()=>setLocs([])); },[]);
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      {locs.map(l => (
        <div key={l.id} className="bg-white rounded shadow p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-lg font-semibold">{l.name}</div>
            <div className="ml-auto text-xs text-slate-500">{l.humidity}% · {l.temperaturec}°C</div>
          </div>
          <div className="h-28 bg-slate-100 rounded mb-3" />
          <div className="grid grid-cols-2 gap-2 text-center">
            <div>
              <div className="text-xl font-bold">{l.capacity}</div>
              <div className="text-xs text-slate-500">Total Capacity</div>
            </div>
            <div>
              <div className="text-xl font-bold">{l.stock}</div>
              <div className="text-xs text-slate-500">Stock Available</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
