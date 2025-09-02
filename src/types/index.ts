export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'nutritionist';
  specialty?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  height: number;
  weight: number;
  goal: string;
  dietaryRestrictions: string[];
  createdAt: string;
  lastVisit?: string;
  nextAppointment?: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'followup' | 'evaluation';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
}

export interface DashboardStats {
  totalPatients: number;
  activePatients: number;
  appointmentsToday: number;
  appointmentsThisWeek: number;
  revenue: {
    thisMonth: number;
    lastMonth: number;
    growth: number;
  };
  newPatientsThisMonth: number;
}

export interface NotificationType {
  id: string;
  type: 'appointment' | 'payment' | 'reminder' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}
