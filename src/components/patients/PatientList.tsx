import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Filter, Users, Phone, Mail, Calendar } from 'lucide-react';
import { faker } from '@faker-js/faker';
import { Patient } from '../../types';

// Generate mock patients
const generateMockPatients = (): Patient[] => {
  return Array.from({ length: 20 }, (_, index) => ({
    id: `patient-${index + 1}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    birthDate: faker.date.birthdate().toISOString(),
    gender: faker.helpers.arrayElement(['male', 'female', 'other']),
    height: Number(faker.number.float({ min: 1.5, max: 2.0 }).toFixed(2)),
    weight: Number(faker.number.float({ min: 50, max: 120 }).toFixed(1)),
    goal: faker.helpers.arrayElement(['Perder peso', 'Ganhar massa', 'Manter peso', 'Reeducação alimentar']),
    dietaryRestrictions: faker.helpers.arrayElements(['Lactose', 'Glúten', 'Açúcar', 'Vegano'], { min: 0, max: 2 }),
    createdAt: faker.date.recent().toISOString(),
    lastVisit: faker.date.recent().toISOString(),
    nextAppointment: faker.date.future().toISOString(),
    status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
    avatar: faker.image.avatar(),
  }));
};

export const PatientList: React.FC = () => {
  const [patients] = useState<Patient[]>(generateMockPatients());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'inactive': return 'bg-neutral-100 text-neutral-500 border-neutral-200';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-neutral-100 text-neutral-500 border-neutral-200';
    }
  };

  const getStatusLabel = (status: Patient['status']) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'pending': return 'Pendente';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-semibold text-neutral-700 mb-2">
            Pacientes
          </h1>
          <p className="text-neutral-500">
            Gerencie seus pacientes e acompanhe o progresso
          </p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Novo Paciente</span>
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="card"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar pacientes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-neutral-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="input-field"
            >
              <option value="all">Todos</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
              <option value="pending">Pendentes</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total', value: patients.length, color: 'text-primary-500' },
          { label: 'Ativos', value: patients.filter(p => p.status === 'active').length, color: 'text-success' },
          { label: 'Inativos', value: patients.filter(p => p.status === 'inactive').length, color: 'text-neutral-500' },
          { label: 'Pendentes', value: patients.filter(p => p.status === 'pending').length, color: 'text-warning' },
        ].map((stat, index) => (
          <div key={stat.label} className="card text-center">
            <p className="text-sm text-neutral-500 mb-1">{stat.label}</p>
            <p className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Patient Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPatients.map((patient, index) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="card hover:shadow-medium transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={patient.avatar}
                  alt={patient.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-neutral-700">{patient.name}</h3>
                  <p className="text-sm text-neutral-500">{patient.goal}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                {getStatusLabel(patient.status)}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-neutral-600">
                <Mail className="w-4 h-4 mr-2" />
                <span className="truncate">{patient.email}</span>
              </div>
              <div className="flex items-center text-sm text-neutral-600">
                <Phone className="w-4 h-4 mr-2" />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center text-sm text-neutral-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Última consulta: {new Date(patient.lastVisit || '').toLocaleDateString('pt-BR')}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">Peso atual:</span>
                <span className="font-medium text-neutral-700">{patient.weight}kg</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-neutral-500">Altura:</span>
                <span className="font-medium text-neutral-700">{patient.height}m</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredPatients.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-500 mb-2">
            Nenhum paciente encontrado
          </h3>
          <p className="text-neutral-400">
            Tente ajustar os filtros ou adicionar um novo paciente
          </p>
        </motion.div>
      )}
    </div>
  );
};
