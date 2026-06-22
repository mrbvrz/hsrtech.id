/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ITService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  iconName: string; // Dynamic icon rendering
  basePrice: string;
  estimatedTime: string;
  category: 'hardware' | 'network' | 'software' | 'consulting' | 'cctv';
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'network' | 'website' | 'cctv' | 'maintenance' | 'hardware';
  client: string;
  location: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string[];
  tags: string[];
  image: string; // Unsplash dynamic background URL or elegant generation
  statsRef?: { label: string; value: string };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  comment: string;
  rating: number;
}

export interface Reservation {
  id: string;
  serviceId: string;
  serviceTitle: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyName?: string;
  bookingDate: string;
  bookingTime: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}
