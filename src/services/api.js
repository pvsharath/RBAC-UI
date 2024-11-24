const API_BASE_URL = 'http://localhost:3001';

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const fetchUsers = () => fetchJson(`${API_BASE_URL}/users`);

export const createUser = (user) => fetchJson(`${API_BASE_URL}/users`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(user)
});

export const updateUser = (id, updates) => fetchJson(`${API_BASE_URL}/users/${id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updates)
});

export const deleteUser = (id) => fetchJson(`${API_BASE_URL}/users/${id}`, { method: 'DELETE' });

