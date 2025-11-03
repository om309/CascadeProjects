import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthCtx = createContext(null);

export function AuthProvider({ children }){
  const [authed, setAuthed] = useState(false);

  useEffect(()=>{
    setAuthed(localStorage.getItem('ilms_authed') === '1');
  },[]);

  const value = useMemo(()=>({
    authed,
    login(){ localStorage.setItem('ilms_authed','1'); setAuthed(true); },
    logout(){ localStorage.removeItem('ilms_authed'); setAuthed(false); },
  }),[authed]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth(){
  const ctx = useContext(AuthCtx);
  if(!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function Protected({ children }){
  const { authed } = useAuth();
  if(!authed) return null;
  return children;
}
