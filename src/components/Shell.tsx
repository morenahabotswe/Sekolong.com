import React from 'react';
import {
  BookOpen,
  CalendarDays,
  Home,
  UserRound,
  MessageCircle,
  LogOut,
  WifiOff,
  Languages,
} from 'lucide-react';
import type { User, Page, Language } from '../types';
import { useOnline } from '../hooks/useOnline';
import { t } from '../lib/i18n';

export function Brand() {
  return (
    <div className="flex items-center">
      <img
        src="/sekolonglogo.PNG"
        alt="Sekolong logo"
        className="h-9 w-auto max-w-[180px] object-contain"
      />
    </div>
  );
}

interface ShellProps {
  user: User;
  page: Page;
  language: Language;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
  onLanguageChange: (lang: Language) => void;
  children: React.ReactNode;
}

export function Shell({
  user,
  page,
  language,
  onLogout,
  onNavigate,
  onLanguageChange,
  children,
}: ShellProps) {
  const online = useOnline();

  const studentNav: [string, Page, any][] = [
    [t(language, 'dashboard'), 'home', Home],
    [t(language, 'learn'), 'learn', BookOpen],
    [t(language, 'mosuoe'), 'mosuoe', MessageCircle],
    [t(language, 'classes'), 'classes', CalendarDays],
    [t(language, 'profile'), 'profile', UserRound],
  ];

  const teacherNav: [string, Page, any][] = [
    [t(language, 'dashboard'), 'home', Home],
    [t(language, 'classes'), 'classes', CalendarDays],
    ['Students', 'profile', UserRound],
    ['Resources', 'learn', BookOpen],
  ];

  const adminNav: [string, Page, any][] = [
    ['Overview', 'home', Home],
    ['Students', 'profile', UserRound],
    ['Curriculum', 'learn', BookOpen],
    [t(language, 'classes'), 'classes', CalendarDays],
  ];

  const nav =
    user.role === 'student'
      ? studentNav
      : user.role === 'teacher'
      ? teacherNav
      : adminNav;

  return (
    <div className="min-h-screen bg-[#f7fbff]">
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Brand />
          <div className="flex items-center gap-2">
            {!online && (
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <WifiOff size={14} /> Offline
              </span>
            )}
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'st' : 'en')}
              className="icon-btn"
              title="Switch language"
            >
              <Languages size={18} />
            </button>
            <button onClick={onLogout} className="icon-btn" title="Log out">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-6">{children}</main>

      <nav className="bottom-nav">
        {nav.map(([label, p, Icon]) => (
          <button
            key={label}
            onClick={() => onNavigate(p)}
            className={`nav-item ${page === p ? 'text-aqua' : ''}`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export function SectionTitle({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-lg font-bold text-ink">{children}</h2>
      {action && (
        <button className="text-sm font-semibold text-aqua">{action}</button>
      )}
    </div>
  );
}
