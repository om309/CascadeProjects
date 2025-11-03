import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export default function MaterialDetails() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    code:'', name:'', type:'Finished Goods', state:'Solid', category:'', materialClass:'', groupName:'', uom:'TON'
  });

  async function load(){
    try { const data = await api.products.list(); setItems(data); }
    catch { setItems([]); }
  }

  useEffect(()=>{ load(); },[]);

  async function submit(e){
    e.preventDefault();
    setErr('');
    if(!form.code || !form.name){ setErr('Code and Name are required'); return; }
    setSaving(true);
    try {
      if (editingId) {
        await api.products.update(editingId, form);
      } else {
        await api.products.create(form);
      }
      setForm({ code:'', name:'', type:'Finished Goods', state:'Solid', category:'', materialClass:'', groupName:'', uom:'TON' });
      setEditingId(null);
      await load();
    } catch (e){ setErr('Failed to save'); }
    finally { setSaving(false); }
  }

  function startEdit(p){
    setEditingId(p.id);
    setForm({
      code: p.code||'', name: p.name||'', type: p.type||'', state: p.state||'', category: p.category||'', materialClass: p.materialClass||'', groupName: p.groupName||'', uom: p.uom||''
    });
  }

  async function remove(id){
    if (!confirm('Delete this product?')) return;
    try { await api.products.remove(id); await load(); }
    catch { setErr('Delete failed'); }
  }

  return (
    <div className="space-y-4">
      {/* Hero details for selected product */}
      {items[0] && (
        <div className="bg-white rounded shadow p-4">
          <div className="text-lg font-semibold mb-3">{items[0].name}</div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 flex items-center justify-center">
              <div className="w-56 h-56 bg-orange-50 border border-orange-200 rounded flex items-center justify-center text-orange-700 font-semibold">CEMENT</div>
            </div>
            <div className="md:col-span-2">
              <div className="border rounded overflow-hidden">
                <div className="px-3 py-2 bg-slate-50 border-b font-medium">Material Details</div>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b"><td className="px-3 py-2 text-slate-500 w-52">Material Code</td><td className="px-3 py-2">{items[0].code}</td></tr>
                    <tr className="border-b"><td className="px-3 py-2 text-slate-500">Material Type</td><td className="px-3 py-2">{items[0].type}</td></tr>
                    <tr className="border-b"><td className="px-3 py-2 text-slate-500">Material Class</td><td className="px-3 py-2">{items[0].materialClass}</td></tr>
                    <tr className="border-b"><td className="px-3 py-2 text-slate-500">Material Group</td><td className="px-3 py-2">{items[0].groupName}</td></tr>
                    <tr className="border-b"><td className="px-3 py-2 text-slate-500">Material State</td><td className="px-3 py-2">{items[0].state}</td></tr>
                    <tr className="border-b"><td className="px-3 py-2 text-slate-500">Base UOM</td><td className="px-3 py-2">{items[0].uom}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={submit} className="bg-white rounded shadow p-4 grid md:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs text-slate-500 mb-1">Code</label>
          <input className="w-full border rounded px-2 py-1" value={form.code} onChange={e=>setForm({...form, code:e.target.value})} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-slate-500 mb-1">Name</label>
          <input className="w-full border rounded px-2 py-1" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">UOM</label>
          <input className="w-full border rounded px-2 py-1" value={form.uom} onChange={e=>setForm({...form, uom:e.target.value})} />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">Type</label>
          <input className="w-full border rounded px-2 py-1" value={form.type} onChange={e=>setForm({...form, type:e.target.value})} />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">State</label>
          <input className="w-full border rounded px-2 py-1" value={form.state} onChange={e=>setForm({...form, state:e.target.value})} />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">Category</label>
          <input className="w-full border rounded px-2 py-1" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">Class</label>
          <input className="w-full border rounded px-2 py-1" value={form.materialClass} onChange={e=>setForm({...form, materialClass:e.target.value})} />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">Group</label>
          <input className="w-full border rounded px-2 py-1" value={form.groupName} onChange={e=>setForm({...form, groupName:e.target.value})} />
        </div>
        <div className="flex items-end gap-2">
          <button className="bg-sky-600 text-white rounded px-4 py-2" disabled={saving}>{saving? 'Saving…': editingId? 'Update Product':'Create Product'}</button>
          {editingId && (
            <button type="button" className="border border-slate-300 rounded px-3 py-2" onClick={()=>{ setEditingId(null); setForm({ code:'', name:'', type:'Finished Goods', state:'Solid', category:'', materialClass:'', groupName:'', uom:'TON' }); }}>Cancel</button>
          )}
        </div>
        {err && <div className="md:col-span-4 text-sm text-rose-600">{err}</div>}
      </form>

      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-500">{items.length} products</div>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name or code" className="border rounded px-2 py-1" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.filter(p=> {
            const s = (q||'').toLowerCase();
            if(!s) return true;
            return (p.name||'').toLowerCase().includes(s) || (p.code||'').toLowerCase().includes(s);
          }).map(p=> (
          <div key={p.id} className="bg-white rounded shadow p-4">
            <h3 className="font-semibold">{p.name}</h3>
            <div className="text-sm text-slate-600">Code: {p.code}</div>
            <div className="text-sm">Type: {p.type} · State: {p.state}</div>
            <div className="text-sm">Category: {p.category} · Class: {p.materialClass}</div>
            <div className="text-sm">Group: {p.groupName} · UOM: {p.uom}</div>
            <div className="mt-3 flex gap-2">
              <button className="text-sky-700" onClick={()=>startEdit(p)}>Edit</button>
              <button className="text-rose-700" onClick={()=>remove(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
