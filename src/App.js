import React from 'react';
import UserManagement from './components/UserManagement';
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">RBAC Management Dashboard</h1>
        <UserManagement />
      </div>
    </ThemeProvider>
  );
}

export default App;

