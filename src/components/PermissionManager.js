import React, { useState, useEffect } from 'react';
import { getRoles, updateRole } from '../services/api';

function PermissionManager() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const fetchedRoles = await getRoles();
    setRoles(fetchedRoles);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setPermissions(role.permissions);
  };

  const handlePermissionToggle = (permission) => {
    setPermissions(prevPermissions => 
      prevPermissions.includes(permission)
        ? prevPermissions.filter(p => p !== permission)
        : [...prevPermissions, permission]
    );
  };

  const handleSave = async () => {
    if (selectedRole) {
      await updateRole(selectedRole.id, { ...selectedRole, permissions });
      fetchRoles();
      setSelectedRole(null);
      setPermissions([]);
    }
  };

  const allPermissions = ['create', 'read', 'update', 'delete'];

  return (
    <div>
      <h2>Permission Manager</h2>
      <div>
        <h3>Select a role:</h3>
        {roles.map(role => (
          <button key={role.id} onClick={() => handleRoleSelect(role)}>
            {role.name}
          </button>
        ))}
      </div>
      {selectedRole && (
        <div>
          <h3>Manage permissions for {selectedRole.name}</h3>
          {allPermissions.map(permission => (
            <label key={permission}>
              <input
                type="checkbox"
                checked={permissions.includes(permission)}
                onChange={() => handlePermissionToggle(permission)}
              />
              {permission}
            </label>
          ))}
          <button onClick={handleSave}>Save Permissions</button>
        </div>
      )}
    </div>
  );
}

export default PermissionManager;