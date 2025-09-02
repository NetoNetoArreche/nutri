import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  User as UserIcon, 
  LogOut, 
  Settings,
  ChevronDown
} from 'lucide-react';
import { NotificationType, User } from '../../types';

interface HeaderProps {
  user: User | null;
  sidebarCollapsed: boolean;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, sidebarCollapsed, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock notifications
  const notifications: NotificationType[] = [
    {
      id: '1',
      type: 'appointment',
      title: 'Consulta em 30 minutos',
      message: 'Maria Silva - Consulta de retorno',
      time: '30min',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Pagamento recebido',
      message: 'João Santos - R$ 180,00',
      time: '2h',
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Lembrete de plano alimentar',
      message: 'Atualizar dieta da Ana Costa',
      time: '4h',
      read: true,
      priority: 'low'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header 
      className={`fixed top-0 right-0 h-20 bg-white border-b border-neutral-200 shadow-soft z-20 transition-all duration-300`}
      style={{ 
        left: sidebarCollapsed ? '80px' : '320px',
        width: sidebarCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 320px)'
      }}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar pacientes, consultas, planos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-neutral-500 hover:text-primary-500 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-strong border border-neutral-200 z-50"
                >
                  <div className="p-4 border-b border-neutral-100">
                    <h3 className="font-medium text-neutral-700">Notificações</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
                          !notification.read ? 'bg-primary-50/30' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.priority === 'high' ? 'bg-error' :
                            notification.priority === 'medium' ? 'bg-warning' : 'bg-success'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-neutral-700">
                              {notification.title}
                            </p>
                            <p className="text-sm text-neutral-500 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-neutral-400 mt-2">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4">
                    <button className="w-full text-sm text-primary-500 hover:text-primary-600 font-medium">
                      Ver todas as notificações
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 text-neutral-500 hover:text-primary-500 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <img
                  src={user.avatar || `https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover bg-neutral-200"
                />
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-strong border border-neutral-200 z-50"
                  >
                    <div className="p-4 border-b border-neutral-100">
                      <p className="font-medium text-neutral-700 truncate">{user.name}</p>
                      <p className="text-sm text-neutral-500 truncate">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <button className="flex items-center w-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors">
                        <UserIcon className="w-4 h-4 mr-3" />
                        Meu Perfil
                      </button>
                      <button className="flex items-center w-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors">
                        <Settings className="w-4 h-4 mr-3" />
                        Configurações
                      </button>
                    </div>
                    <div className="p-2 border-t border-neutral-100">
                      <button
                        onClick={onLogout}
                        className="flex items-center w-full px-3 py-2 text-sm text-error hover:bg-error/10 rounded-md transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sair
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
