import React, { useState, useEffect } from 'react';
import { getRoles, createRole, updateRole, deleteRole } from '../services/api';

function RoleTable() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const fetchedRoles = await getRoles();
    setRoles(fetchedRoles);
  };

  const handleInputChange = (e) => {
    setNewRole({ ...newRole, [e.target.name]: e.target.value });
  };

  const handlePermissionChange = (e) => {
    const permissions = e.target.value.split(',').map(perm => perm.trim());
    setNewRole({ ...newRole, permissions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRole(newRole);
    setNewRole({ name: '', permissions: [] });
    fetchRoles();
  };

  const handleUpdate = async (id, updatedRole) => {
    await updateRole(id, updatedRole);
    fetchRoles();
  };

  const handleDelete = async (id) => {
    await deleteRole(id);
    fetchRoles();
  };

  return (
    <div>
      <h2>Role Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newRole.name}
          onChange={handleInputChange}
          placeholder="Role Name"
          required
        />
        <input
          type="text"
          name="permissions"
          value={newRole.permissions.join(', ')}
          onChange={handlePermissionChange}
          placeholder="Permissions (comma-separated)"
          required
        />
        <button type="submit">Add Role</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(', ')}</td>
              <td>
                <button onClick={() => handleUpdate(role.id, { ...role, name: 'Updated ' + role.name })}>
                  Update
                </button>
                <button onClick={() => handleDelete(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoleTable;