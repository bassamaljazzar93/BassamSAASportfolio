
import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
  images: string[];
  stats?: { label: string; value: string }[];
  tags: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  tags: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export enum PortfolioView {
  MODERN = 'modern',
  TERMINAL = 'terminal'
}
