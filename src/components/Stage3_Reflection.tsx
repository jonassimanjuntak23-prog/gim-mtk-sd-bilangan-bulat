import React, { useState, useEffect } from 'react';
import { LevelInfo, ReflectionQuestion } from '../types/game';
import { REFLECTION_QUESTIONS } from '../data/levelsData';
import { soundFX } from '../utils/soundEffects';
import { speechNarration } from '../utils/speechNarration';
import {
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  Heart,
  Brain,
  Smile,
  HelpCircle,
  BookOpen,
} from 'lucide-react';

interface Stage3ReflectionProps {
  level: LevelInfo;
  earnedScore: number;
  onFinishLevel: (reflectionSummary: Record<string, string>) => void;
}

export const Stage3_Reflection: React.FC<Stage3ReflectionProps> = ({
  level,
  earnedScore,
  onFinishLevel,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQ: ReflectionQuestion = REFLECTION_QUESTIONS[currentStep];

  useEffect(() => {
    if (!currentQ) return;
    const promptText = `Tahap Tiga: Merefleksi Pembelajaran. Pertanyaan: ${currentQ.prompt}`;
    speechNarration.speak(promptText);
  }, [currentStep, currentQ]);

  const handleSelectResponse = (val: string) => {
    soundFX.playClick();
    const updated = { ...answers, [currentQ.id]: val };
    setAnswers(updated);

    if (currentStep < REFLECTION_QUESTIONS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      soundFX.playFanfare();
      onFinishLevel(updated);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 overflow-hidden bg-gradient-to-b from-amber-50/50 to-orange-50/30 select-none">
      {/* Top Banner: Stage 3 Deep Learning */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-3 shadow-md border-2 border-amber-300 shrink-0">
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-sm tracking-wide rounded-xl shadow uppercase flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-yellow-200" />
            TAHAP 3: REFLEKSI PEMBELAJARAN MENDALAM
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              {level.title}
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              Refleksi metakognitif untuk memperkuat pemahaman konsep bermakna
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-yellow-100 border border-yellow-300 px-3 py-1.5 rounded-xl font-black text-sm text-yellow-900">
          <Award className="w-4 h-4 text-amber-600" />
          <span>Langkah {currentStep + 1} dari {REFLECTION_QUESTIONS.length}</span>
        </div>
      </div>

      {/* Main Reflection Question Container */}
      <div className="flex-1 my-3 bg-white rounded-3xl p-6 shadow-xl border-2 border-amber-200 flex flex-col justify-between overflow-hidden">
        <div>
          {/* Question Badge */}
          <div className="flex items-center gap-2 mb-2 text-amber-600 font-extrabold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Pertanyaan Refleksi Siswa:</span>
          </div>

          {/* Prompt Headline */}
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug tracking-tight mb-6">
            "{currentQ.prompt}"
          </h3>

          {/* 3 Standard Deep Learning Rating Buttons */}
          {currentQ.type === 'rating' && (
            <div className="grid grid-cols-3 gap-5 mt-4">
              <button
                onClick={() => handleSelectResponse('SAYA SUDAH MEMAHAMI')}
                className="p-6 rounded-3xl border-4 border-emerald-300 bg-emerald-50 hover:bg-emerald-100 active:scale-95 transition-all text-center flex flex-col items-center gap-3 shadow-md group"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  😊
                </div>
                <span className="text-xl font-black text-emerald-900">
                  SAYA SUDAH MEMAHAMI
                </span>
                <span className="text-xs font-bold text-emerald-700">
                  Saya yakin bisa menjelaskan konsep ini kepada teman sekelas!
                </span>
              </button>

              <button
                onClick={() => handleSelectResponse('SAYA MASIH PERLU BERLATIH')}
                className="p-6 rounded-3xl border-4 border-amber-300 bg-amber-50 hover:bg-amber-100 active:scale-95 transition-all text-center flex flex-col items-center gap-3 shadow-md group"
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  🤔
                </div>
                <span className="text-xl font-black text-amber-900">
                  SAYA MASIH PERLU BERLATIH
                </span>
                <span className="text-xs font-bold text-amber-700">
                  Saya sudah paham dasar-dasarnya, tetapi butuh latihan soal lagi.
                </span>
              </button>

              <button
                onClick={() => handleSelectResponse('SAYA INGIN BELAJAR LEBIH LANJUT')}
                className="p-6 rounded-3xl border-4 border-blue-300 bg-blue-50 hover:bg-blue-100 active:scale-95 transition-all text-center flex flex-col items-center gap-3 shadow-md group"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  🚀
                </div>
                <span className="text-xl font-black text-blue-900">
                  SAYA INGIN BELAJAR LEBIH LANJUT
                </span>
                <span className="text-xs font-bold text-blue-700">
                  Saya sangat tertarik dan ingin mencoba variasi soal yang lebih menantang!
                </span>
              </button>
            </div>
          )}

          {/* Multiple Choice Reflection Options (Large Touch Buttons) */}
          {(currentQ.type === 'choice' || currentQ.type === 'scenario') && currentQ.options && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectResponse(opt)}
                  className="p-5 rounded-2xl border-3 border-amber-200 hover:border-amber-400 bg-amber-50/50 hover:bg-amber-100/70 text-left font-black text-slate-800 text-base md:text-lg transition-all active:scale-[0.98] shadow-sm flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 shadow">
                    {i + 1}
                  </div>
                  <span className="leading-snug">{opt}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Tidak ada jawaban salah dalam refleksi. Jawablah sesuai apa yang kamu rasakan secara jujur!</span>
          <span className="text-amber-700">Tahap Terakhir Menuju Penghargaan Juara ★</span>
        </div>
      </div>

      {/* Bottom Progress */}
      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden shrink-0">
        <div
          className="bg-amber-500 h-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / REFLECTION_QUESTIONS.length) * 100}%` }}
        />
      </div>
    </div>
  );
};
