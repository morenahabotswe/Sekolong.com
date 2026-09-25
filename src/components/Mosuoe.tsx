import React, { useState } from 'react';
import {
  ArrowUp,
  BookOpen,
  ChevronLeft,
  Lightbulb,
  RotateCcw,
  Loader2,
} from 'lucide-react';
import type { ChatMessage, User, Language } from '../types';
import { t } from '../lib/i18n';

interface MosuoeProps {
  user: User;
  language: Language;
  onBack: () => void;
}

// This is the function you will later replace with a real API call
async function askMosuoe(question: string, user: User): Promise<string> {
  // TODO: Replace this mock with a real call:
  // const res = await fetch('/api/mosuoe', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ question, userId: user.id, grade: user.grade, language: user.language })
  // });
  // const data = await res.json();
  // return data.reply;

  // Current mock Socratic responses
  await new Promise((r) => setTimeout(r, 800)); // simulate network

  const q = question.toLowerCase();

  if (q.includes('fraction') || q.includes('fraction')) {
    return language === 'st'
      ? 'Ho lokile. Ha re nke mohato o le mong. Haeba pizza e le \'ngoe e arolelanoa ka ho lekana bathong ba bane, motho e mong le e mong o fumana likarolo tse kae?'
      : 'That is okay. Let us take it one step at a time. If one pizza is shared equally between four people, how many pieces does each person get?';
  }

  if (q.includes('hello') || q.includes('dumela') || q.includes('hi')) {
    return language === 'st'
      ? `Dumela ${user.name.split(' ')[0]}! Ke thabile ho u bona. U batla ho utloisisa eng kajeno?`
      : `Hello ${user.name.split(' ')[0]}! I am happy to see you. What would you like to understand today?`;
  }

  return language === 'st'
    ? 'Potso e monate. Pele ke hlalosa, u se u ntse u tseba eng ka sena? Re tla sebetsa hammoho, mohato ka mohato.'
    : 'Good question. Before I explain, what do you already know about this? We will work it out together, step by step.';
}

export function Mosuoe({ user, language, onBack }: MosuoeProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'mosuoe',
      text:
        language === 'st'
          ? `Dumela ${user.name.split(' ')[0]}! Ke Mosuoe — tichere ea hau ea digital. Mosuoe o teng. U batla ho utloisisa eng kajeno?`
          : `Dumela ${user.name.split(' ')[0]}! I am Mosuoe — your digital teacher. Mosuoe o teng. What would you like to understand today?`,
    },
  ]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!text.trim() || loading) return;

    const question = text.trim();
    setText('');
    setMessages((m) => [
      ...m,
      { id: Date.now() + '', role: 'student', text: question },
    ]);
    setLoading(true);

    try {
      const reply = await askMosuoe(question, user);
      setMessages((m) => [
        ...m,
        { id: Date.now() + 'x', role: 'mosuoe', text: reply },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 'e',
          role: 'mosuoe',
          text: 'Sorry, I had a problem answering. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <button
        onClick={onBack}
        className="mb-5 flex items-center gap-1 text-sm text-slate-500"
      >
        <ChevronLeft size={18} /> {t(language, 'back')}
      </button>

      <div className="mosuoe-head">
        <div className="mosuoe-avatar">M</div>
        <div>
          <p className="eyebrow text-aqua">Mosuoe</p>
          <h1 className="text-2xl font-extrabold text-white">
            Your digital teacher
          </h1>
          <p className="text-sm text-mist">
            Mosuoe o teng · Grade {user.grade || 7} · Mathematics
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-auto">
        <button className="chip">
          <BookOpen size={15} /> Fractions context
        </button>
        <button className="chip">
          <Lightbulb size={15} /> Give me a hint
        </button>
        <button className="chip">Sesotho</button>
      </div>

      <div className="chat-box mt-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={m.role === 'student' ? 'bubble student' : 'bubble mosuoe'}
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="bubble mosuoe flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" />
            Thinking...
          </div>
        )}

        <div className="mt-auto pt-4 text-center text-xs text-slate-400">
          MOCK MOSOUE MODE · Ready for /api/mosuoe
        </div>
      </div>

      <div className="mt-3 flex gap-2 rounded-2xl bg-white p-2 shadow-sm">
        <input
          className="flex-1 bg-transparent px-3 outline-none"
          placeholder={t(language, 'askPlaceholder')}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          disabled={loading}
        />
        <button onClick={send} className="send-btn" disabled={loading}>
          {loading ? <Loader2 size={20} className="animate-spin" /> : <ArrowUp size={20} />}
        </button>
      </div>

      <button
        onClick={() => setMessages(messages.slice(0, 1))}
        className="mx-auto mt-3 flex items-center gap-1 text-xs text-slate-400"
      >
        <RotateCcw size={13} /> {t(language, 'clear')}
      </button>
    </div>
  );
}
