import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar
        user={user}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <Header
        user={user}
        sidebarCollapsed={sidebarCollapsed}
        onLogout={logout}
      />

      <main
        className="pt-20 transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? '80px' : '320px',
          width: sidebarCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 320px)'
        }}
      >
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
