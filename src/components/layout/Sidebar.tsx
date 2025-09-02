import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  DollarSign, 
  Settings,
  Stethoscope,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { User } from '../../types';

interface SidebarProps {
  user: User | null;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navigation = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/patients', label: 'Pacientes', icon: Users },
  { path: '/appointments', label: 'Agenda', icon: Calendar },
  { path: '/plans', label: 'Planos Alimentares', icon: FileText },
  { path: '/financial', label: 'Financeiro', icon: DollarSign },
  { path: '/settings', label: 'Configurações', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  user,
  isCollapsed, 
  onToggleCollapse 
}) => {
  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 320 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full bg-white border-r border-neutral-200 shadow-soft z-30"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-neutral-700">NutriPlataforma</h2>
                <p className="text-xs text-neutral-500">Gestão Inteligente</p>
              </div>
            </motion.div>
          )}
          
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-md hover:bg-neutral-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-neutral-500" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-neutral-500" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `sidebar-link w-full ${isActive ? 'active' : ''}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="ml-3 font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        {user && (
          <div className="p-4 border-t border-neutral-100">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <img
                src={user.avatar || `https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover bg-neutral-200"
              />
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-medium text-neutral-700 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">
                    {user.specialty || 'Nutricionista'}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
};
