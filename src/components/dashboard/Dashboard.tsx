import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { DashboardCharts } from './DashboardCharts';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-neutral-700 mb-2">
          Dashboard
        </h1>
        <p className="text-neutral-500">
          Visão geral do seu consultório e métricas importantes
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Pacientes"
          value={308}
          change={{ value: 12, type: 'increase' }}
          icon={Users}
          delay={0.1}
        />
        <StatsCard
          title="Consultas Hoje"
          value={8}
          change={{ value: 5, type: 'increase' }}
          icon={Calendar}
          iconColor="text-secondary-400"
          delay={0.2}
        />
        <StatsCard
          title="Receita Mensal"
          value="R$ 24.800"
          change={{ value: 18, type: 'increase' }}
          icon={DollarSign}
          iconColor="text-success"
          delay={0.3}
        />
        <StatsCard
          title="Taxa de Crescimento"
          value="15.3%"
          change={{ value: 3, type: 'increase' }}
          icon={TrendingUp}
          iconColor="text-warning"
          delay={0.4}
        />
      </div>

      {/* Charts Section */}
      <DashboardCharts />

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-neutral-700 mb-4">
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Novo Paciente', color: 'bg-primary-500 hover:bg-primary-600' },
            { label: 'Agendar Consulta', color: 'bg-secondary-400 hover:bg-secondary-500' },
            { label: 'Criar Plano', color: 'bg-success hover:bg-success/90' },
            { label: 'Relatório', color: 'bg-warning hover:bg-warning/90' },
          ].map((action, index) => (
            <button
              key={action.label}
              className={`${action.color} text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 active:scale-98 shadow-soft hover:shadow-medium`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
