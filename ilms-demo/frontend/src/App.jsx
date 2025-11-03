import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import MaterialClassification from './pages/MaterialClassification'
import { AuthProvider, useAuth } from './lib/auth'

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route element={<Layout/>}>
            <Route path="/materials" element={<RequireAuth><MaterialClassification/></RequireAuth>} />
            <Route path="/" element={<Navigate to="/login" replace/>} />
            <Route path="*" element={<Navigate to="/login" replace/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

function RequireAuth({ children }){
  const { authed } = useAuth();
  if (!authed) return <Navigate to="/login" replace/>;
  return children;
}
