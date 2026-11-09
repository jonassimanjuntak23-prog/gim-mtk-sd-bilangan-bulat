import React from 'react';
import { LevelInfo, LevelProgress, LevelId } from '../types/game';
import { LEVELS_CONFIG } from '../data/levelsData';
import { soundFX } from '../utils/soundEffects';
import {
  ThermometerSnowflake,
  ShoppingBag,
  GitFork,
  Box,
  PieChart,
  Star,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
} from 'lucide-react';

interface LevelSelectViewProps {
  progressMap: Record<LevelId, LevelProgress>;
  onSelectLevel: (lvl: LevelInfo) => void;
  onResetProgress: () => void;
}

export const LevelSelectView: React.FC<LevelSelectViewProps> = ({
  progressMap,
  onSelectLevel,
  onResetProgress,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ThermometerSnowflake':
        return <ThermometerSnowflake className="w-10 h-10 text-blue-500" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-10 h-10 text-emerald-500" />;
      case 'GitFork':
        return <GitFork className="w-10 h-10 text-amber-500" />;
      case 'Box':
        return <Box className="w-10 h-10 text-purple-500" />;
      case 'PieChart':
        return <PieChart className="w-10 h-10 text-rose-500" />;
      default:
        return <Sparkles className="w-10 h-10 text-red-500" />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 select-none">
      {/* View Header */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-3 shadow-md border-2 border-red-200 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-red-600 text-white font-extrabold text-[11px] rounded-lg flex items-center gap-1 shadow-sm">
              <span>✝</span> SD KRISTEN TERAMIA
            </span>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              PILIH PETUALANGAN MATEMATIKA CERDAS
            </h2>
          </div>
          <p className="text-xs font-bold text-slate-500 mt-0.5">
            Semua level terbuka bebas! Pilih topik pembelajaran yang ingin dimainkan bersama kelas:
          </p>
        </div>

        {/* Reset Data Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onResetProgress();
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl font-extrabold text-xs border border-slate-300 hover:border-red-300 transition-all active:scale-95"
          title="Reset skor dan progres semua level"
        >
          <RotateCcw className="w-4 h-4" />
          <span>RESET PROGRES</span>
        </button>
      </div>

      {/* 5 Big Cards Grid (Single-Screen Fit, Extra Large Touch Targets) */}
      <div className="grid grid-cols-5 gap-3.5 my-3 h-full max-h-[520px]">
        {LEVELS_CONFIG.map((lvl) => {
          const prog = progressMap[lvl.id];
          const hasScore = prog && prog.score > 0;
          const stars = prog ? prog.stars : 0;

          return (
            <div
              key={lvl.id}
              onClick={() => {
                soundFX.playClick();
                onSelectLevel(lvl);
              }}
              className="bg-white rounded-3xl border-3 border-slate-200 hover:border-red-500 shadow-md hover:shadow-2xl transition-all duration-200 p-4 flex flex-col justify-between cursor-pointer group active:scale-[0.98] relative overflow-hidden"
            >
              {/* Level Number Pill */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs rounded-xl shadow">
                  {lvl.numberStr}
                </span>

                {/* Stars Indicator */}
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-lg border border-yellow-200">
                  {[1, 2, 3].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= stars ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Themed Icon Box */}
              <div className="my-2 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  {getIcon(lvl.iconName)}
                </div>
              </div>

              {/* Title & Description */}
              <div className="text-center">
                <h3 className="font-black text-base text-slate-800 group-hover:text-red-600 transition-colors leading-tight line-clamp-2">
                  {lvl.title}
                </h3>
                <p className="text-[11px] font-bold text-slate-500 mt-1 line-clamp-2 leading-snug">
                  {lvl.description}
                </p>
              </div>

              {/* Score / Badge Pill */}
              <div className="my-1 py-1 px-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                {hasScore ? (
                  <div className="flex items-center justify-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs font-black text-slate-700">
                      Skor: {prog.score} • {prog.badge}
                    </span>
                  </div>
                ) : (
                  <span className="text-[11px] font-bold text-slate-400">
                    Siap Dimainkan!
                  </span>
                )}
              </div>

              {/* Big Touch Action Button */}
              <button
                className="w-full py-2.5 px-3 bg-gradient-to-r from-red-600 to-rose-600 group-hover:from-red-500 group-hover:to-rose-500 text-white font-extrabold text-sm rounded-2xl shadow-md border border-yellow-300 flex items-center justify-center gap-1.5 transition-all"
              >
                <Play className="w-4 h-4 fill-current text-yellow-300" />
                <span>MULAI LEVEL</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs font-bold text-slate-500 bg-white/70 py-1.5 rounded-xl border">
        Ketuk kartu level mana pun untuk langsung memulai pembelajaran tatap muka di Interactive Flat Panel 75 Inci.
      </div>
    </div>
  );
};
