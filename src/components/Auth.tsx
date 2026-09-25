import React, { useState } from 'react';
import { ArrowRight, Languages, LockKeyhole, Mail } from 'lucide-react';
import { Brand } from './Shell';
import type { Role, User, Language } from '../types';
import { demoUsers } from '../data/demo';
import { t } from '../lib/i18n';

interface AuthProps {
  onLogin: (u: User) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Auth({ onLogin, language, onLanguageChange }: AuthProps) {
  const [role, setRole] = useState<Role>('student');
  const [email, setEmail] = useState('');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#eefaff] via-white to-[#eef0ff] p-5">
      <div className="w-full max-w-md">
        <Brand />

        <div className="mt-10 rounded-3xl bg-white p-6 shadow-xl shadow-brand/10">
          <p className="eyebrow">{t(language, 'digitalLearning')}</p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink">
            {t(language, 'tagline')}
          </h1>
          <p className="mt-3 text-slate-600">
            {t(language, 'teachersStudents')}{' '}
            <b>Mosuoe</b> {t(language, 'alwaysReady')}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {(['student', 'teacher', 'admin'] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={role === r ? 'role active' : 'role'}
              >
                {r}
              </button>
            ))}
          </div>

          <label className="field">
            <Mail size={18} />
            <input
              placeholder="Email (optional for demo)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="field">
            <LockKeyhole size={18} />
            <input type="password" placeholder="Password" defaultValue="demo1234" />
          </label>

          <button
            className="primary-btn mt-3 w-full"
            onClick={() =>
              onLogin({
                ...demoUsers[role],
                email: email || demoUsers[role].email,
                language,
              })
            }
          >
            {t(language, 'enter')} <ArrowRight size={18} />
          </button>

          <button
            className="mt-4 flex w-full items-center justify-center gap-2 text-sm text-slate-500"
            onClick={() => onLanguageChange(language === 'en' ? 'st' : 'en')}
          >
            <Languages size={16} />
            {language === 'en' ? 'English · Sesotho' : 'Sesotho · English'}
          </button>

          <p className="mt-5 text-center text-xs text-slate-400">
            {t(language, 'demoNote')}
          </p>
        </div>
      </div>
    </div>
  );
}
