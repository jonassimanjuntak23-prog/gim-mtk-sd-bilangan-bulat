import React, { useEffect, useState } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { speechNarration } from '../utils/speechNarration';
import { soundFX } from '../utils/soundEffects';

interface MascotGuideProps {
  speechText?: string;
  mood?: 'happy' | 'thinking' | 'celebrate' | 'encouraging';
  compact?: boolean;
}

export const MascotGuide: React.FC<MascotGuideProps> = ({
  speechText,
  mood = 'happy',
  compact = false,
}) => {
  const [ttsState, setTtsState] = useState({ speaking: false, paused: false, text: '' });

  useEffect(() => {
    const unsub = speechNarration.subscribe((st) => setTtsState(st));
    return unsub;
  }, []);

  const displayedText = ttsState.text || speechText || 'Ayo semangat, para juara SD TERAMIA! Kita bisa taklukkan matematika!';

  const handleMascotClick = () => {
    soundFX.playClick();
    speechNarration.speak(displayedText);
  };

  return (
    <div
      onClick={handleMascotClick}
      className={`cursor-pointer transition-all flex items-center ${
        compact ? 'gap-2' : 'gap-4 p-2'
      }`}
      title="Klik untuk mendengarkan narator berbicara!"
    >
      {/* Animated Mascot Avatar */}
      <div className="relative group shrink-0">
        <div
          className={`relative rounded-full bg-gradient-to-tr from-red-500 to-amber-400 p-1.5 shadow-lg border-2 border-white transition-transform active:scale-95 ${
            ttsState.speaking ? 'animate-bounce' : 'animate-float'
          } ${compact ? 'w-14 h-14' : 'w-20 h-20'}`}
        >
          {/* Custom SVG Avatar: Cheerful Christian Elementary Student */}
          <svg viewBox="0 0 100 100" className="w-full h-full rounded-full bg-amber-50">
            {/* Hair Base */}
            <circle cx="50" cy="46" r="36" fill="#3e2723" />
            {/* Face */}
            <circle cx="50" cy="52" r="30" fill="#fed7aa" />
            {/* Neat Hairstyle Bangs (Side Parting) */}
            <path d="M 24 38 Q 45 22 74 34 C 68 28 50 26 30 30 Z" fill="#3e2723" />
            {/* Side Hair */}
            <path d="M 22 36 C 20 45 20 52 24 58 L 22 42 Z" fill="#3e2723" />
            <path d="M 76 34 C 80 44 80 52 76 58 L 78 40 Z" fill="#3e2723" />
            {/* Eyes */}
            <circle cx="40" cy="50" r="4" fill="#1e293b" />
            <circle cx="60" cy="50" r="4" fill="#1e293b" />
            <circle cx="41.5" cy="48.5" r="1.5" fill="#ffffff" />
            <circle cx="61.5" cy="48.5" r="1.5" fill="#ffffff" />
            {/* Blushing cheeks */}
            <circle cx="34" cy="56" r="4" fill="#f87171" opacity="0.6" />
            <circle cx="66" cy="56" r="4" fill="#f87171" opacity="0.6" />
            {/* Cheerful Smile */}
            {mood === 'thinking' ? (
              <path d="M 44 62 Q 50 65 56 62" stroke="#991b1b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            ) : (
              <path d="M 42 60 Q 50 69 58 60 Z" fill="#b91c1c" />
            )}
            {/* School Uniform Shirt Collar */}
            <path d="M 32 82 L 68 82 L 64 98 L 36 98 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
            {/* Red Tie */}
            <path d="M 47 82 L 53 82 L 55 94 L 50 98 L 45 94 Z" fill="#dc2626" />
            {/* Golden Christian School Cross Badge */}
            <circle cx="70" cy="74" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            <text x="70" y="78" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#78350f">
              ✝
            </text>
          </svg>

          {/* Sound waves indicator when speaking */}
          {ttsState.speaking && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border border-white items-center justify-center">
                <Volume2 className="w-2.5 h-2.5 text-white" />
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Speech Bubble with clean typography and sound prompt */}
      <div className="relative bg-white border-2 border-red-200 rounded-2xl px-4 py-2.5 shadow-md max-w-xl flex items-start gap-2 text-slate-800">
        <div className="shrink-0 mt-0.5 text-amber-500">
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-600">
              Pemandu Matematika Cerdas
            </span>
            <span className="text-[10px] font-semibold text-slate-600 flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-red-500" />
              Ketuk untuk dengar
            </span>
          </div>
          <p className="text-sm font-bold text-slate-800 leading-snug line-clamp-3">
            "{displayedText}"
          </p>
        </div>
      </div>
    </div>
  );
};
