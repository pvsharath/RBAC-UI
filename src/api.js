const API_BASE_URL = 'http://localhost:3001';

// Default users data
const defaultUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'manager', status: 'inactive' },
];

let users = [...defaultUsers];

async function fetchJson(url, options = {}) {
  try {
    if (url.includes('/users')) {
      // Simulate API call with local data
      return new Promise((resolve) => {
        setTimeout(() => {
          if (options.method === 'POST') {
            const newUser = JSON.parse(options.body);
            newUser.id = users.length + 1;
            users.push(newUser);
            resolve(newUser);
          } else if (options.method === 'PATCH') {
            const userId = parseInt(url.split('/').pop());
            const updates = JSON.parse(options.body);
            const userIndex = users.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
              users[userIndex] = { ...users[userIndex], ...updates };
              resolve(users[userIndex]);
            }
          } else if (options.method === 'DELETE') {
            const userId = parseInt(url.split('/').pop());
            users = users.filter(u => u.id !== userId);
            resolve({ success: true });
          } else {
            resolve(users);
          }
        }, 200); // Simulate network delay
      });
    }
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

export const fetchUsers = () => fetchJson(`${API_BASE_URL}/users`);

export const createUser = (user) => {
  console.log('Creating user:', user);
  return fetchJson(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
};

export const updateUser = (id, updates) => fetchJson(`${API_BASE_URL}/users/${id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updates)
});

export const deleteUser = (id) => fetchJson(`${API_BASE_URL}/users/${id}`, { method: 'DELETE' });

