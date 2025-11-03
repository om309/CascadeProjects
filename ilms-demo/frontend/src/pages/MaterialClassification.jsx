import { useState } from 'react';
import MaterialDetails from './tabs/MaterialDetails';
import BillOfMaterial from './tabs/BillOfMaterial';
import StorageLocation from './tabs/StorageLocation';
import SupplierDetails from './tabs/SupplierDetails';

const tabs = [
  { key:'material', label:'Material Details', comp: MaterialDetails },
  { key:'bom', label:'Bill Of Material', comp: BillOfMaterial },
  { key:'storage', label:'Storage Location', comp: StorageLocation },
  { key:'supplier', label:'Supplier Details', comp: SupplierDetails },
];

export default function MaterialClassification(){
  const [active, setActive] = useState('material');
  const Active = tabs.find(t=>t.key===active)?.comp || MaterialDetails;
  return (
    <div className="space-y-4">
      <div className="text-xl font-semibold">Material Classification</div>
      <div className="flex gap-2 border-b">
        {tabs.map(t=> (
          <button key={t.key} onClick={()=>setActive(t.key)} className={`px-3 py-2 -mb-px border-b-2 ${active===t.key?'border-sky-600 text-sky-700':'border-transparent text-slate-500'}`}>{t.label}</button>
        ))}
      </div>
      <Active />
    </div>
  );
}
