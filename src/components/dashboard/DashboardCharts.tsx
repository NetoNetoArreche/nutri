import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for charts
const revenueData = [
  { month: 'Jan', value: 4200 },
  { month: 'Fev', value: 3800 },
  { month: 'Mar', value: 5200 },
  { month: 'Abr', value: 4900 },
  { month: 'Mai', value: 6100 },
  { month: 'Jun', value: 5800 },
];

const appointmentsData = [
  { day: 'Seg', appointments: 8 },
  { day: 'Ter', appointments: 12 },
  { day: 'Qua', appointments: 6 },
  { day: 'Qui', appointments: 15 },
  { day: 'Sex', appointments: 10 },
  { day: 'Sab', appointments: 4 },
  { day: 'Dom', appointments: 2 },
];

const patientsData = [
  { name: 'Ativos', value: 245, color: '#2C5AA0' },
  { name: 'Inativos', value: 35, color: '#87CEEB' },
  { name: 'Novos', value: 28, color: '#4A90E2' },
];

export const DashboardCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-neutral-700 mb-4">
          Receita Mensal
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2C5AA0" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2C5AA0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
            <XAxis dataKey="month" stroke="#6C757D" fontSize={12} />
            <YAxis stroke="#6C757D" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E9ECEF',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)'
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2C5AA0"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Appointments Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-neutral-700 mb-4">
          Consultas Semanais
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={appointmentsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
            <XAxis dataKey="day" stroke="#6C757D" fontSize={12} />
            <YAxis stroke="#6C757D" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E9ECEF',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)'
              }}
            />
            <Bar dataKey="appointments" fill="#4A90E2" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Patients Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-neutral-700 mb-4">
          Distribuição de Pacientes
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={patientsData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {patientsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-neutral-700 mb-4">
          Atividades Recentes
        </h3>
        <div className="space-y-4">
          {[
            { action: 'Nova consulta agendada', patient: 'Maria Silva', time: '2 min atrás' },
            { action: 'Plano alimentar atualizado', patient: 'João Santos', time: '15 min atrás' },
            { action: 'Pagamento recebido', patient: 'Ana Costa', time: '1h atrás' },
            { action: 'Paciente cadastrado', patient: 'Carlos Oliveira', time: '2h atrás' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-neutral-700">
                  {activity.action}
                </p>
                <p className="text-sm text-neutral-500">{activity.patient}</p>
              </div>
              <span className="text-xs text-neutral-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
