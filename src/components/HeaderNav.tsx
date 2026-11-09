import React, { useState, useEffect } from 'react';
import {
  Maximize,
  Minimize,
  Home,
  ArrowLeft,
  RotateCcw,
  Volume2,
  VolumeX,
  HelpCircle,
  Play,
  Pause,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import { soundFX } from '../utils/soundEffects';
import { speechNarration } from '../utils/speechNarration';

interface HeaderNavProps {
  currentView: 'home' | 'level_select' | 'stage1' | 'stage2' | 'stage3' | 'level_summary';
  currentLevelId?: number;
  onGoHome: () => void;
  onGoBack: () => void;
  onRestartLevel?: () => void;
  onOpenHelp: () => void;
  title?: string;
  subtitle?: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentView,
  currentLevelId,
  onGoHome,
  onGoBack,
  onRestartLevel,
  onOpenHelp,
  title,
  subtitle,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundOn, setSoundOn] = useState(!soundFX.getMuted());
  const [ttsOn, setTtsOn] = useState(speechNarration.getEnabled());
  const [ttsState, setTtsState] = useState({ speaking: false, paused: false, text: '' });

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const unsubscribe = speechNarration.subscribe((st) => {
      setTtsState(st);
    });
    return unsubscribe;
  }, []);

  const toggleFullscreen = async () => {
    soundFX.playClick();
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.warn('Fullscreen error:', e);
    }
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundFX.setMuted(!next);
    if (next) soundFX.playClick();
  };

  const toggleTts = () => {
    soundFX.playClick();
    const next = !ttsOn;
    setTtsOn(next);
    speechNarration.setEnabled(next);
  };

  const handleTtsPlayPause = () => {
    soundFX.playClick();
    if (ttsState.speaking && !ttsState.paused) {
      speechNarration.pause();
    } else if (ttsState.paused) {
      speechNarration.resume();
    } else {
      speechNarration.repeat();
    }
  };

  const handleTtsRepeat = () => {
    soundFX.playClick();
    speechNarration.repeat();
  };

  return (
    <header className="w-full h-16 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white px-4 py-2 flex items-center justify-between shadow-lg border-b-4 border-yellow-400 select-none z-30 shrink-0">
      {/* School Badge & Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/30 shadow-sm">
          <div className="w-9 h-9 rounded-lg bg-yellow-400 text-red-900 flex items-center justify-center font-black text-xl shadow border border-white">
            ✝
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-wide text-yellow-300 drop-shadow">
              SD KRISTEN TERAMIA
            </span>
            <span className="text-[10px] font-semibold text-white/90 uppercase tracking-wider">
              Kelas VI • Matematika Berhikmat
            </span>
          </div>
        </div>

        {/* Dynamic Context Header */}
        {(title || subtitle) && (
          <div className="hidden lg:flex flex-col border-l-2 border-white/25 pl-3">
            <h1 className="text-base font-extrabold tracking-wide text-white drop-shadow-sm flex items-center gap-1.5">
              {title}
            </h1>
            {subtitle && (
              <span className="text-xs font-medium text-yellow-200">
                {subtitle}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Control Buttons Group (Extra Large Touch Friendly for 75" IFP) */}
      <div className="flex items-center gap-2">
        {/* Navigation Buttons */}
        {currentView !== 'home' && (
          <>
            <button
              onClick={() => {
                soundFX.playClick();
                onGoBack();
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/20 hover:bg-white/30 active:scale-95 transition-all rounded-xl font-bold text-sm text-white border border-white/30 shadow-sm"
              title="Kembali ke halaman sebelumnya"
              aria-label="Kembali"
            >
              <ArrowLeft className="w-5 h-5 text-yellow-300" />
              <span className="hidden sm:inline">KEMBALI</span>
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                onGoHome();
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/20 hover:bg-white/30 active:scale-95 transition-all rounded-xl font-bold text-sm text-white border border-white/30 shadow-sm"
              title="Kembali ke Beranda"
              aria-label="Beranda"
            >
              <Home className="w-5 h-5 text-yellow-300" />
              <span className="hidden sm:inline">BERANDA</span>
            </button>
          </>
        )}

        {/* Restart Current Level Button */}
        {onRestartLevel && (currentView === 'stage1' || currentView === 'stage2' || currentView === 'stage3') && (
          <button
            onClick={() => {
              soundFX.playClick();
              onRestartLevel();
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 active:scale-95 transition-all rounded-xl font-bold text-sm text-white border border-amber-300 shadow-sm"
            title="Ulangi level ini dari awal"
            aria-label="Ulangi Permainan"
          >
            <RotateCcw className="w-5 h-5 text-white" />
            <span className="hidden md:inline">ULANGI</span>
          </button>
        )}

        {/* TTS Narator Speech Controls */}
        <div className="flex items-center bg-black/20 backdrop-blur-sm p-1 rounded-xl border border-white/20 gap-1">
          <button
            onClick={toggleTts}
            className={`p-2 rounded-lg transition-all active:scale-95 flex items-center gap-1 font-bold text-xs ${
              ttsOn ? 'bg-emerald-500 text-white' : 'bg-white/20 text-white/70'
            }`}
            title={ttsOn ? 'Matikan Suara Narator' : 'Nyalakan Suara Narator'}
            aria-label="Toggle Narator"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="hidden lg:inline">{ttsOn ? 'NARATOR AKTIF' : 'NARATOR MATI'}</span>
          </button>

          {ttsOn && (
            <>
              <button
                onClick={handleTtsPlayPause}
                disabled={!ttsState.text && !ttsState.speaking}
                className="p-2 hover:bg-white/20 rounded-lg text-white disabled:opacity-40 transition-all active:scale-95"
                title={ttsState.speaking && !ttsState.paused ? 'Jeda Narator' : 'Putar Narasi'}
                aria-label="Play/Pause Narasi"
              >
                {ttsState.speaking && !ttsState.paused ? (
                  <Pause className="w-4 h-4 text-yellow-300" />
                ) : (
                  <Play className="w-4 h-4 text-yellow-300" />
                )}
              </button>

              <button
                onClick={handleTtsRepeat}
                className="p-2 hover:bg-white/20 rounded-lg text-white transition-all active:scale-95"
                title="Ulangi Pembacaan Narasi"
                aria-label="Ulangi Narasi"
              >
                <RotateCw className="w-4 h-4 text-yellow-300" />
              </button>
            </>
          )}
        </div>

        {/* Audio FX Sound Toggle */}
        <button
          onClick={toggleSound}
          className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all active:scale-95 text-white border border-white/30"
          title={soundOn ? 'Matikan Efek Suara' : 'Nyalakan Efek Suara'}
          aria-label="Toggle Sound Effects"
        >
          {soundOn ? <Volume2 className="w-5 h-5 text-yellow-300" /> : <VolumeX className="w-5 h-5 text-red-200" />}
        </button>

        {/* Help Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onOpenHelp();
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all rounded-xl font-bold text-sm text-white border border-blue-400 shadow-sm"
          title="Bantuan & Petunjuk Penggunaan"
          aria-label="Bantuan"
        >
          <HelpCircle className="w-5 h-5 text-yellow-300" />
          <span className="hidden sm:inline">BANTUAN</span>
        </button>

        {/* Real Fullscreen API Button */}
        <button
          onClick={toggleFullscreen}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-yellow-400 hover:bg-yellow-300 active:scale-95 transition-all rounded-xl font-extrabold text-sm text-red-900 border-2 border-yellow-200 shadow-md"
          title={isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh (IFP 75 Inci)'}
          aria-label="Layar Penuh"
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          <span className="hidden md:inline font-black">
            {isFullscreen ? 'LAYAR KECIL' : 'LAYAR PENUH'}
          </span>
        </button>
      </div>
    </header>
  );
};
