import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800">
      <aside className="w-56 bg-slate-900 text-white flex flex-col">
        <div className="h-14 flex items-center px-4 font-semibold tracking-wide">ILMS Demo</div>
        <nav className="flex-1 px-2 space-y-1">
          <NavLink to="/materials" className={({isActive})=>`block px-3 py-2 rounded hover:bg-slate-800 ${isActive?'bg-slate-800':''}`}>Material Classification</NavLink>
        </nav>
        <div className="p-3 text-xs text-slate-400">Developed for demo</div>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="h-14 border-b bg-white flex items-center px-4 gap-2">
          <input placeholder="Search" className="border rounded px-3 py-1 w-80" />
          <div className="ml-auto flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-300" />
          </div>
        </header>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
