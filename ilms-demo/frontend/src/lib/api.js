export const API_BASE = 'http://localhost:8080';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const api = {
  products: {
    list: () => request('/api/products'),
    create: (body) => request('/api/products', { method: 'POST', body: JSON.stringify(body) }),
    update: (id, body) => request(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    remove: (id) => fetch(`${API_BASE}/api/products/${id}`, { method: 'DELETE' }).then(r=>{ if(!r.ok) throw new Error('Delete failed'); }),
  },
  suppliers: {
    list: () => request('/api/suppliers'),
    create: (body) => request('/api/suppliers', { method: 'POST', body: JSON.stringify(body) }),
  },
  locations: {
    list: () => request('/api/locations'),
  },
};
