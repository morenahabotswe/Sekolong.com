export type Role = 'student' | 'teacher' | 'admin' | 'parent';
export type Language = 'en' | 'st';
export type Page = 'home' | 'learn' | 'classes' | 'profile' | 'mosuoe';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  grade?: number;
  school?: string;
  language: Language;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  progress: number;
  course: string;
  topic: string;
}

export interface LiveClass {
  id: string;
  subject: string;
  grade: number;
  teacher: string;
  date: string;
  time: string;
  duration: number;
  meetUrl: string;
  status: 'upcoming' | 'recorded';
}

export interface Resource {
  id: string;
  title: string;
  type: string;
  subject: string;
  downloadable: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'student' | 'mosuoe';
  text: string;
}
