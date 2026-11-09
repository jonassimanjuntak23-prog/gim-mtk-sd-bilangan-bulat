import React from 'react';
import { soundFX } from '../utils/soundEffects';
import { MascotGuide } from './MascotGuide';
import {
  Play,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface HomeViewProps {
  onStartAdventure: () => void;
  onOpenHelp: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartAdventure,
  onOpenHelp,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 overflow-hidden bg-gradient-to-br from-red-600 via-rose-600 to-red-700 text-white select-none relative">
      {/* Decorative Background Elements (Christian Crosses & Math Symbols) */}
      <div className="absolute top-6 left-8 text-yellow-300/15 font-black text-9xl pointer-events-none select-none">
        ✝
      </div>
      <div className="absolute bottom-8 right-10 text-yellow-300/15 font-black text-9xl pointer-events-none select-none">
        ✝
      </div>
      <div className="absolute top-1/4 right-16 text-white/10 font-black text-8xl pointer-events-none select-none">
        Α Ω
      </div>
      <div className="absolute bottom-1/4 left-10 text-white/10 font-black text-8xl pointer-events-none select-none">
        ∑
      </div>
      <div className="absolute top-1/2 left-3 text-white/10 font-black text-7xl pointer-events-none select-none">
        √
      </div>

      {/* Clean Welcome Tagline Banner */}
      <div className="flex items-center justify-center z-10 shrink-0">
        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-2 rounded-2xl border-2 border-yellow-300 text-yellow-300 font-black text-xs md:text-sm uppercase tracking-widest shadow-lg">
          <span className="text-xl">✝</span>
          <span>SD KRISTEN TERAMIA • GENERASI BERIMAN, BERHIKMAT, DAN BERPRESTASI</span>
          <span className="text-xl">✝</span>
        </div>
      </div>

      {/* Main Hero Content: Title, Christian Emblem & Mascot, and Taglines */}
      <div className="my-auto flex items-center justify-between gap-8 max-w-6xl mx-auto w-full z-10">
        {/* Left Side: Christian School Emblem & Student Champions */}
        <div className="w-5/12 flex flex-col items-center justify-center">
          <div className="relative group">
            {/* Glowing Golden Heavenly Aura */}
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>

            {/* Emblem Card */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-3xl bg-white p-4 shadow-2xl border-4 border-yellow-400 flex items-center justify-center animate-float overflow-hidden">
              <svg viewBox="0 0 240 240" className="w-full h-full">
                {/* Background Rays */}
                <g opacity="0.25">
                  {Array.from({ length: 12 }, (_, i) => (
                    <line
                      key={i}
                      x1="120"
                      y1="120"
                      x2={120 + 110 * Math.cos((i * 30 * Math.PI) / 180)}
                      y2={120 + 110 * Math.sin((i * 30 * Math.PI) / 180)}
                      stroke="#f59e0b"
                      strokeWidth="10"
                    />
                  ))}
                </g>

                {/* Celestial Ring */}
                <circle cx="120" cy="120" r="105" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6,4" />
                <circle cx="120" cy="120" r="98" fill="#fffdf5" stroke="#dc2626" strokeWidth="4" />

                {/* Flying White Dove of Peace with Olive Branch */}
                <g transform="translate(120, 48) scale(0.65)">
                  {/* Body & Wings */}
                  <path
                    d="M 0 0 C 12 -18 32 -14 38 -2 C 28 -2 20 4 16 12 C 24 16 32 18 36 28 C 24 24 14 18 6 16 C 0 24 -12 28 -22 22 C -14 16 -8 10 -4 4 C -12 2 -20 -6 -18 -16 C -10 -10 -4 -4 0 0 Z"
                    fill="#ffffff"
                    stroke="#ca8a04"
                    strokeWidth="2"
                  />
                  {/* Halo around Dove */}
                  <circle cx="0" cy="-6" r="18" fill="none" stroke="#facc15" strokeWidth="1.5" opacity="0.6" />
                </g>

                {/* Grand Golden Christian Cross (Salib Kasih Kristus) */}
                <g transform="translate(120, 105)">
                  {/* Outer Bevel Shadow */}
                  <path
                    d="M -9 -52 L 9 -52 L 9 -14 L 32 -14 L 32 4 L 9 4 L 9 45 L -9 45 L -9 4 L -32 4 L -32 -14 L -9 -14 Z"
                    fill="#b45309"
                  />
                  {/* Main Golden Cross Body */}
                  <path
                    d="M -8 -50 L 8 -50 L 8 -12 L 30 -12 L 30 2 L 8 2 L 8 43 L -8 43 L -8 2 L -30 2 L -30 -12 L -8 -12 Z"
                    fill="url(#goldGradient)"
                    stroke="#fef08a"
                    strokeWidth="1"
                  />
                  {/* Highlight core */}
                  <path
                    d="M -4 -46 L 4 -46 L 4 -10 L 26 -10 L 26 -2 L 4 -2 L 4 39 L -4 39 L -4 -2 L -26 -2 L -26 -10 L -4 -10 Z"
                    fill="#fef9c3"
                    opacity="0.8"
                  />
                  {/* Cross Center Ruby Jewel */}
                  <circle cx="0" cy="-5" r="4.5" fill="#dc2626" stroke="#ffffff" strokeWidth="1" />
                </g>

                {/* Open Holy Bible / Alkitab ("Firman & Hikmat") */}
                <g transform="translate(120, 168)">
                  {/* Book Base */}
                  <path
                    d="M -48 10 Q -24 4 0 12 Q 24 4 48 10 L 44 26 Q 22 20 0 28 Q -22 20 -44 26 Z"
                    fill="#78350f"
                  />
                  {/* Left Page */}
                  <path
                    d="M -46 8 Q -24 2 0 10 L 0 26 Q -22 18 -42 24 Z"
                    fill="#ffffff"
                    stroke="#ca8a04"
                    strokeWidth="1"
                  />
                  {/* Right Page */}
                  <path
                    d="M 0 10 Q 24 2 46 8 L 42 24 Q 22 18 0 26 Z"
                    fill="#ffffff"
                    stroke="#ca8a04"
                    strokeWidth="1"
                  />
                  {/* Text lines in Bible */}
                  <line x1="-36" y1="12" x2="-8" y2="10" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="-36" y1="16" x2="-10" y2="14" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="-36" y1="20" x2="-14" y2="18" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="8" y1="10" x2="36" y2="12" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="10" y1="14" x2="36" y2="16" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="14" y1="18" x2="36" y2="20" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" />
                  {/* Red Bookmark Ribbon */}
                  <path d="M -1 10 L 4 10 L 6 30 L 1.5 27 L -3 30 Z" fill="#dc2626" />
                </g>

                {/* Two Smiling Christian SD Students (Boy and Girl with School Uniform & Cross Badges) */}
                {/* Boy Student (Left) */}
                <g transform="translate(36, 128) scale(0.68)">
                  {/* Boy Hair (Neat short side-part) */}
                  <path d="M 12 16 Q 28 0 48 10 Q 56 16 54 32 C 54 44 48 50 48 54 L 14 54 Q 10 40 10 28 Z" fill="#3e2723" />
                  {/* Boy Face */}
                  <circle cx="32" cy="36" r="20" fill="#fed7aa" />
                  {/* Hair Forehead Bangs */}
                  <path d="M 16 28 Q 32 18 46 26 C 42 22 32 20 20 22 Z" fill="#3e2723" />
                  {/* Eyes */}
                  <circle cx="25" cy="34" r="3" fill="#1e293b" />
                  <circle cx="39" cy="34" r="3" fill="#1e293b" />
                  <circle cx="26" cy="33" r="1" fill="#ffffff" />
                  <circle cx="40" cy="33" r="1" fill="#ffffff" />
                  {/* Rosy Cheek */}
                  <circle cx="20" cy="40" r="3" fill="#f87171" opacity="0.6" />
                  <circle cx="44" cy="40" r="3" fill="#f87171" opacity="0.6" />
                  {/* Big Smile */}
                  <path d="M 26 42 Q 32 49 38 42 Z" fill="#b91c1c" />
                  {/* Shirt & Red Tie with Cross */}
                  <path d="M 14 54 L 50 54 L 46 75 L 18 75 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                  <path d="M 30 54 L 34 54 L 36 68 L 32 72 L 28 68 Z" fill="#dc2626" />
                  <text x="32" y="65" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#fef08a">✝</text>
                </g>

                {/* Girl Student (Right) */}
                <g transform="translate(156, 128) scale(0.68)">
                  {/* Girl Hair (Neat with red ribbon/headband) */}
                  <path d="M 8 16 Q 32 2 54 16 C 58 30 56 50 52 56 L 10 56 C 8 46 6 30 8 16 Z" fill="#2d1c14" />
                  {/* Red Headband */}
                  <path d="M 12 26 Q 32 16 50 26" stroke="#dc2626" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <circle cx="48" cy="24" r="4" fill="#fbbf24" />
                  {/* Girl Face */}
                  <circle cx="32" cy="36" r="20" fill="#fed7aa" />
                  {/* Forehead fringe */}
                  <path d="M 16 28 Q 32 22 48 28 C 42 24 30 24 18 26 Z" fill="#2d1c14" />
                  {/* Eyes */}
                  <circle cx="25" cy="34" r="3" fill="#1e293b" />
                  <circle cx="39" cy="34" r="3" fill="#1e293b" />
                  <circle cx="26" cy="33" r="1" fill="#ffffff" />
                  <circle cx="40" cy="33" r="1" fill="#ffffff" />
                  {/* Rosy Cheek */}
                  <circle cx="20" cy="40" r="3" fill="#f87171" opacity="0.6" />
                  <circle cx="44" cy="40" r="3" fill="#f87171" opacity="0.6" />
                  {/* Smile */}
                  <path d="M 26 42 Q 32 49 38 42 Z" fill="#b91c1c" />
                  {/* Shirt & Red Ribbon Collar with Cross */}
                  <path d="M 14 54 L 50 54 L 46 75 L 18 75 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                  <path d="M 28 54 L 36 54 L 35 66 L 32 69 L 29 66 Z" fill="#dc2626" />
                  <text x="32" y="64" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#fef08a">✝</text>
                </g>

                {/* Gradients */}
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="30%" stopColor="#facc15" />
                    <stop offset="70%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#ca8a04" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className="px-5 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-400 text-red-950 rounded-full font-black text-xs uppercase tracking-wider shadow-md border-2 border-white flex items-center gap-1.5 justify-center">
              <span>✝</span>
              <span>SD KRISTEN TERAMIA</span>
              <span>✝</span>
            </span>
          </div>
        </div>

        {/* Right Side: Headlines and Action Buttons */}
        <div className="w-7/12 flex flex-col items-start space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-yellow-300 font-extrabold text-xs tracking-wider">
              <Sparkles className="w-4 h-4" />
              SELAMAT DATANG, PARA JUARA MATEMATIKA BERHIKMAT!
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white drop-shadow-md">
              PETUALANGAN MATEMATIKA CERDAS
            </h1>

            <p className="text-xl md:text-2xl font-black text-yellow-300 italic tracking-wide drop-shadow">
              "Berhitung, Berpikir, dan Menjadi Juara!"
            </p>

            <p className="text-sm md:text-base font-semibold text-white/90 max-w-xl leading-relaxed">
              Modul Matematika Kelas VI SD Kristen Teramia dirancang khusus untuk pembelajaran tatap muka Interactive Flat Panel (IFP). Mengasah hikmat, melatih logika, memecahkan masalah kontekstual, dan merefleksikan makna pembelajaran!
            </p>
          </div>

          {/* Big Action Buttons (Touch Friendly) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full">
            <button
              onClick={() => {
                soundFX.playClick();
                onStartAdventure();
              }}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 active:scale-95 text-red-950 font-black text-xl rounded-2xl shadow-2xl border-4 border-white transition-all group"
            >
              <Play className="w-7 h-7 fill-current text-red-900 group-hover:scale-110 transition-transform" />
              <span>MULAI PETUALANGAN</span>
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                onOpenHelp();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-white/20 hover:bg-white/30 active:scale-95 text-white font-extrabold text-base rounded-2xl shadow-lg border-2 border-white/40 transition-all"
            >
              <HelpCircle className="w-6 h-6 text-yellow-300" />
              <span>PETUNJUK BERMAIN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mascot Speech Bubble Prompt */}
      <div className="z-10 shrink-0 max-w-4xl mx-auto w-full">
        <MascotGuide
          speechText="Halo, para juara kelas VI SD Kristen Teramia! Tekan tombol kuning 'MULAI PETUALANGAN' untuk memilih materi matematika yang ingin kamu pelajari hari ini!"
          compact
        />
      </div>
    </div>
  );
};
