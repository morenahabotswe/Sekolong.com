import React from 'react';
import {
  ArrowRight,
  CalendarDays,
  Download,
  PlayCircle,
  Plus,
  Users,
  BookOpen,
  GraduationCap,
  Settings,
  BarChart3,
} from 'lucide-react';
import { classes, resources, subjects } from '../data/demo';
import { SectionTitle } from './Shell';
import type { User, Language } from '../types';
import { t } from '../lib/i18n';

export function StudentDashboard({
  user,
  language,
  onMosuoe,
}: {
  user: User;
  language: Language;
  onMosuoe: () => void;
}) {
  return (
    <>
      <div className="mb-7">
        <p className="eyebrow">
          {t(language, 'goodMorning')}, {user.name.split(' ')[0].toUpperCase()} 👋
        </p>
        <h1 className="mt-1 text-3xl font-extrabold text-ink">
          {t(language, 'welcome')}
        </h1>
      </div>

      <button onClick={onMosuoe} className="ask-card">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-mist">
            {t(language, 'mosuoeThere')}
          </p>
          <h2 className="mt-1 text-2xl font-extrabold">{t(language, 'ask')}</h2>
          <p className="mt-1 text-sm text-mist">{t(language, 'mosuoeReady')}</p>
        </div>
        <div className="mosuoe-avatar">M</div>
        <ArrowRight />
      </button>

      <section className="mt-8">
        <SectionTitle action="View all">{t(language, 'continue')}</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {subjects.slice(0, 2).map((s) => (
            <div className="card" key={s.id}>
              <div className="mb-4 flex justify-between">
                <span className="subject-dot" style={{ background: s.color }} />
                <span className="text-sm font-bold text-slate-500">
                  {s.progress}%
                </span>
              </div>
              <h3 className="font-bold text-ink">{s.name}</h3>
              <p className="text-sm text-slate-500">{s.course}</p>
              <div className="progress mt-4">
                <i style={{ width: s.progress + '%', background: s.color }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <SectionTitle>{t(language, 'upcoming')}</SectionTitle>
        <div className="card flex items-center gap-4">
          <div className="date-tile">
            <CalendarDays size={20} />
            <b>16:00</b>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-ink">{classes[0].subject}</h3>
            <p className="text-sm text-slate-500">
              {classes[0].date} · {classes[0].duration} min
            </p>
            <p className="text-xs text-slate-400">
              Teacher: {classes[0].teacher}
            </p>
          </div>
          <a className="text-aqua" href={classes[0].meetUrl} target="_blank" rel="noreferrer">
            <PlayCircle />
          </a>
        </div>
      </section>

      <section className="mt-8">
        <SectionTitle action="Library">{t(language, 'resources')}</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-3">
          {resources.map((r) => (
            <div className="card" key={r.id}>
              <div className="flex items-start justify-between">
                <div className="resource-icon">
                  <Download size={18} />
                </div>
                <span className="text-[10px] uppercase text-slate-400">{r.type}</span>
              </div>
              <h3 className="mt-4 text-sm font-bold text-ink">{r.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{r.subject}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function LearnPage({ language }: { language: Language }) {
  return (
    <>
      <p className="eyebrow">{t(language, 'learn').toUpperCase()}</p>
      <h1 className="mt-1 text-3xl font-extrabold text-ink">
        {t(language, 'continue')}
      </h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {subjects.map((s) => (
          <div className="card" key={s.id}>
            <div className="mb-3 flex items-center gap-3">
              <span className="subject-dot" style={{ background: s.color }} />
              <h3 className="font-bold text-ink">{s.name}</h3>
            </div>
            <p className="text-sm text-slate-500">{s.course}</p>
            <p className="mt-1 text-xs text-slate-400">{s.topic}</p>
            <div className="progress mt-4">
              <i style={{ width: s.progress + '%', background: s.color }} />
            </div>
            <p className="mt-2 text-right text-sm font-bold text-slate-500">
              {s.progress}%
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export function ClassesPage({ language }: { language: Language }) {
  return (
    <>
      <p className="eyebrow">{t(language, 'classes').toUpperCase()}</p>
      <h1 className="mt-1 text-3xl font-extrabold text-ink">
        {t(language, 'upcoming')}
      </h1>
      <div className="mt-6 space-y-4">
        {classes.map((c) => (
          <div className="card flex items-center gap-4" key={c.id}>
            <div className="date-tile">
              <CalendarDays size={20} />
              <b>{c.time}</b>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-ink">{c.subject}</h3>
              <p className="text-sm text-slate-500">
                {c.date} · {c.duration} min · Grade {c.grade}
              </p>
              <p className="text-xs text-slate-400">Teacher: {c.teacher}</p>
            </div>
            <a
              className="text-aqua"
              href={c.meetUrl}
              target="_blank"
              rel="noreferrer"
            >
              <PlayCircle size={24} />
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export function ProfilePage({
  user,
  language,
}: {
  user: User;
  language: Language;
}) {
  return (
    <>
      <p className="eyebrow">{t(language, 'profile').toUpperCase()}</p>
      <h1 className="mt-1 text-3xl font-extrabold text-ink">{user.name}</h1>
      <div className="mt-6 card space-y-3">
        <p>
          <span className="text-slate-500">Email:</span> {user.email}
        </p>
        <p>
          <span className="text-slate-500">Role:</span> {user.role}
        </p>
        {user.grade && (
          <p>
            <span className="text-slate-500">Grade:</span> {user.grade}
          </p>
        )}
        {user.school && (
          <p>
            <span className="text-slate-500">School:</span> {user.school}
          </p>
        )}
        <p>
          <span className="text-slate-500">Language:</span>{' '}
          {user.language === 'en' ? 'English' : 'Sesotho'}
        </p>
      </div>
    </>
  );
}

export function TeacherDashboard({ language }: { language: Language }) {
  const items = [
    { label: 'My Classes', icon: CalendarDays },
    { label: 'My Students', icon: Users },
    { label: 'Lessons & Resources', icon: BookOpen },
    { label: 'Assignments', icon: GraduationCap },
    { label: 'Attendance', icon: BarChart3 },
    { label: 'Student Progress', icon: BarChart3 },
    { label: 'Live Classes', icon: PlayCircle },
    { label: 'Mosuoe Teacher Assistant', icon: MessageCircleIcon },
  ];

  return (
    <>
      <p className="eyebrow">SEKOLONG TEACHER</p>
      <h1 className="mt-1 text-3xl font-extrabold text-ink">
        {t(language, 'teacherTitle')}
      </h1>
      <p className="mt-2 text-slate-600">{t(language, 'teacherSubtitle')}</p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <div className="card flex min-h-32 flex-col justify-between" key={item.label}>
            <div className="flex justify-between">
              <div className="resource-icon">
                <item.icon size={18} />
              </div>
              <span className="text-xs text-slate-400">
                {i < 3 ? 'Active' : 'Manage'}
              </span>
            </div>
            <div className="flex items-end justify-between">
              <h2 className="font-bold text-ink">{item.label}</h2>
              <ArrowRight size={18} className="text-aqua" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function MessageCircleIcon(props: any) {
  return <MessageCircle {...props} />;
}

import { MessageCircle } from 'lucide-react';

export function AdminDashboard({ language }: { language: Language }) {
  const items = [
    { label: 'Students', icon: Users },
    { label: 'Teachers', icon: GraduationCap },
    { label: 'Schools', icon: BookOpen },
    { label: 'Grades & Subjects', icon: BookOpen },
    { label: 'Courses & Lessons', icon: BookOpen },
    { label: 'Resources', icon: Download },
    { label: 'Live Classes', icon: CalendarDays },
    { label: 'Assessments', icon: BarChart3 },
    { label: 'Mosuoe Analytics', icon: BarChart3 },
    { label: 'Subscriptions & Payments', icon: Settings },
  ];

  return (
    <>
      <p className="eyebrow">SEKOLONG ADMINISTRATION</p>
      <h1 className="mt-1 text-3xl font-extrabold text-ink">
        {t(language, 'adminTitle')}
      </h1>
      <p className="mt-2 text-slate-600">{t(language, 'adminSubtitle')}</p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <div className="card flex min-h-32 flex-col justify-between" key={item.label}>
            <div className="flex justify-between">
              <div className="resource-icon">
                <item.icon size={18} />
              </div>
              <span className="text-xs text-slate-400">
                {i < 3 ? 'Active' : 'Manage'}
              </span>
            </div>
            <div className="flex items-end justify-between">
              <h2 className="font-bold text-ink">{item.label}</h2>
              <ArrowRight size={18} className="text-aqua" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
