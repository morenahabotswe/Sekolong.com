import React, { useState } from 'react';
import { Auth } from './components/Auth';
import { Shell } from './components/Shell';
import {
  StudentDashboard,
  TeacherDashboard,
  AdminDashboard,
  LearnPage,
  ClassesPage,
  ProfilePage,
} from './components/Dashboards';
import { Mosuoe } from './components/Mosuoe';
import type { User, Page, Language } from './types';
import './styles.css';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>('home');
  const [language, setLanguage] = useState<Language>('en');

  const handleLogin = (u: User) => {
    setUser(u);
    setLanguage(u.language);
    setPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('home');
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    if (user) {
      setUser({ ...user, language: lang });
    }
  };

  if (!user) {
    return (
      <Auth
        onLogin={handleLogin}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
    );
  }

  const content = () => {
    if (page === 'mosuoe') {
      return <Mosuoe user={user} language={language} onBack={() => setPage('home')} />;
    }

    if (user.role === 'student') {
      if (page === 'learn') return <LearnPage language={language} />;
      if (page === 'classes') return <ClassesPage language={language} />;
      if (page === 'profile') return <ProfilePage user={user} language={language} />;
      return (
        <StudentDashboard
          user={user}
          language={language}
          onMosuoe={() => setPage('mosuoe')}
        />
      );
    }

    if (user.role === 'teacher') {
      return <TeacherDashboard language={language} />;
    }

    return <AdminDashboard language={language} />;
  };

  return (
    <Shell
      user={user}
      page={page}
      language={language}
      onLogout={handleLogout}
      onNavigate={setPage}
      onLanguageChange={handleLanguageChange}
    >
      {content()}
    </Shell>
  );
}
