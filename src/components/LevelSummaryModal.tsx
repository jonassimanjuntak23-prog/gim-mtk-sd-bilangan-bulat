import React from 'react';
import { LevelInfo, LevelProgress } from '../types/game';
import { calculateBadge, calculateStars } from '../utils/storage';
import { soundFX } from '../utils/soundEffects';
import {
  Trophy,
  Star,
  RotateCcw,
  ListFilter,
  Home,
  CheckCircle,
  Sparkles,
  Award,
} from 'lucide-react';

interface LevelSummaryModalProps {
  level: LevelInfo;
  results: {
    score: number;
    correctCount: number;
    wrongCount: number;
    total: number;
  };
  onPlayAgain: () => void;
  onChooseOtherLevel: () => void;
  onGoHome: () => void;
}

export const LevelSummaryModal: React.FC<LevelSummaryModalProps> = ({
  level,
  results,
  onPlayAgain,
  onChooseOtherLevel,
  onGoHome,
}) => {
  const badge = calculateBadge(results.score);
  const stars = calculateStars(results.score);
  const percentage = Math.round((results.correctCount / results.total) * 100);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 overflow-hidden bg-gradient-to-br from-red-700 via-rose-600 to-red-800 text-white select-none animate-pop-in">
      {/* Decorative Confetti Background Badges */}
      <div className="flex items-center justify-between border-b-2 border-white/20 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" />
          <h2 className="text-xl font-black tracking-wide text-white drop-shadow">
            PENGHARGAAN JUARA SD KRISTEN TERAMIA
          </h2>
        </div>
        <span className="text-xs font-extrabold uppercase px-3 py-1 bg-white/20 rounded-full border border-white/30">
          {level.numberStr}: {level.title}
        </span>
      </div>

      {/* Main Achievement Card */}
      <div className="my-auto bg-white text-slate-800 rounded-3xl p-6 shadow-2xl border-4 border-yellow-400 max-w-4xl mx-auto w-full flex flex-col items-center">
        {/* Trophy & Badge */}
        <div className="relative -mt-14 mb-2">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-300 border-4 border-white shadow-xl flex items-center justify-center animate-bounce">
            <Trophy className="w-12 h-12 text-red-900" />
          </div>
        </div>

        <h3 className="text-3xl font-black text-red-600 tracking-tight">
          SELAMAT, PARA JUARA!
        </h3>
        <p className="text-sm font-bold text-slate-600 mb-3">
          Kamu telah menyelesaikan petualangan dan refleksi dengan sangat baik!
        </p>

        {/* 3 Stars Award */}
        <div className="flex items-center gap-3 my-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`p-3 rounded-2xl transition-all duration-500 shadow-md ${
                s <= stars
                  ? 'bg-gradient-to-tr from-yellow-400 to-amber-300 text-yellow-950 scale-110 animate-pulse'
                  : 'bg-slate-200 text-slate-400'
              }`}
            >
              <Star className="w-8 h-8 fill-current" />
            </div>
          ))}
        </div>

        {/* Badge Title */}
        <div className="my-2 px-6 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl shadow-lg border-2 border-yellow-300">
          <span className="text-xs font-black uppercase tracking-wider text-yellow-300 block text-center">
            Gelar Pencapaian
          </span>
          <span className="text-2xl font-black tracking-wide">{badge}</span>
        </div>

        {/* Metric Statistics Grid */}
        <div className="grid grid-cols-4 gap-4 w-full mt-4">
          <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-200 text-center">
            <span className="text-xs font-extrabold text-slate-500 block">TOTAL SKOR</span>
            <span className="text-2xl font-black text-red-600">{results.score}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-200 text-center">
            <span className="text-xs font-extrabold text-slate-500 block">JAWABAN BENAR</span>
            <span className="text-2xl font-black text-emerald-600">
              {results.correctCount} / {results.total}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-200 text-center">
            <span className="text-xs font-extrabold text-slate-500 block">KEBERHASILAN</span>
            <span className="text-2xl font-black text-blue-600">{percentage}%</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-200 text-center">
            <span className="text-xs font-extrabold text-slate-500 block">PERCOBAAN</span>
            <span className="text-2xl font-black text-purple-600">
              {results.correctCount + results.wrongCount} Kali
            </span>
          </div>
        </div>

        {/* Navigation Action Buttons (Large Touch Targets for IFP) */}
        <div className="flex items-center gap-4 mt-6 w-full justify-center">
          <button
            onClick={() => {
              soundFX.playClick();
              onPlayAgain();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-amber-500 hover:bg-amber-600 active:scale-95 transition-all text-white font-extrabold text-base rounded-2xl shadow-md border-2 border-amber-300"
          >
            <RotateCcw className="w-5 h-5" />
            <span>ULANGI LEVEL INI</span>
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              onChooseOtherLevel();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 active:scale-95 transition-all text-white font-black text-base rounded-2xl shadow-lg border-2 border-yellow-300"
          >
            <ListFilter className="w-5 h-5 text-yellow-300" />
            <span>PILIH LEVEL LAIN</span>
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              onGoHome();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-800 hover:bg-slate-900 active:scale-95 transition-all text-white font-extrabold text-base rounded-2xl shadow-md border-2 border-slate-700"
          >
            <Home className="w-5 h-5 text-yellow-300" />
            <span>KEMBALI KE BERANDA</span>
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-white/80 font-semibold">
        Semua progres dan bintang telah otomatis tersimpan di perangkat layar IFP ini!
      </div>
    </div>
  );
};
