import React from 'react';
import { X, HelpCircle, CheckCircle, Volume2, Maximize, Brain, Award } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-pop-in select-none">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-400 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-400 text-red-900 rounded-xl font-black shadow">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">
                PANDUAN & PETUNJUK BERMAIN
              </h3>
              <p className="text-xs font-semibold text-yellow-200">
                ✝ SD KRISTEN TERAMIA • Interactive Flat Panel (IFP) 75 Inci
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-xl text-white active:scale-95 transition-all"
            aria-label="Tutup Panduan"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* 3 Stages of Deep Learning Overview */}
          <div className="bg-gradient-to-r from-red-50 to-amber-50 p-4 rounded-2xl border-2 border-red-200">
            <h4 className="font-black text-sm text-red-700 uppercase tracking-wide mb-2 flex items-center gap-2">
              <Brain className="w-4 h-4 text-red-600" />
              Tiga Tahapan Pembelajaran Mendalam (Deep Learning):
            </h4>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-red-100 shadow-sm">
                <span className="font-extrabold text-red-600 block mb-1">
                  1. MEMAHAMI & MENGANALISIS
                </span>
                <p className="text-slate-600">
                  Gunakan simulator interaktif (suhu pegunungan, kasir KABATAKU, pohon faktor, kubus 3D, pizza pecahan) untuk menganalisis konsep.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-red-100 shadow-sm">
                <span className="font-extrabold text-amber-600 block mb-1">
                  2. MENGAPLIKASI
                </span>
                <p className="text-slate-600">
                  Selesaikan 10 soal bervariasi: pemahaman konsep, analisis, penerapan kehidupan nyata, dan tantangan HOTS.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-red-100 shadow-sm">
                <span className="font-extrabold text-emerald-600 block mb-1">
                  3. MEREFLEKSI
                </span>
                <p className="text-slate-600">
                  Jawab pertanyaan metakognitif mengenai hal yang dipelajari, strategi berpikir, dan aplikasinya di kehidupan.
                </p>
              </div>
            </div>
          </div>

          {/* Step by Step Guide List */}
          <div className="space-y-2">
            <h4 className="font-black text-sm text-slate-800 uppercase tracking-wide">
              Langkah-Langkah Bermain:
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border">
                <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-black flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <span className="font-bold text-slate-700">
                  <strong>Pilih Level Bebas:</strong> Semua 5 level langsung terbuka tanpa syarat! Guru dan siswa dapat memilih materi secara fleksibel.
                </span>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border">
                <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-black flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <span className="font-bold text-slate-700">
                  <strong>Dengarkan Narator Suara:</strong> Aplikasi dilengkapi suara pemandu Bahasa Indonesia yang ramah. Tekan tombol speaker kapan saja untuk mengulang narasi.
                </span>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border">
                <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-black flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <span className="font-bold text-slate-700">
                  <strong>Sentuh Layar IFP:</strong> Seluruh tombol dan pilihan jawaban dirancang berukuran besar agar mudah ditekan jari pada panel layar sentuh 75 inci.
                </span>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border">
                <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-black flex items-center justify-center shrink-0 text-xs">
                  4
                </span>
                <span className="font-bold text-slate-700">
                  <strong>Gunakan Mode Layar Penuh:</strong> Tekan tombol kuning "LAYAR PENUH" di pojok kanan atas agar game memenuhi seluruh layar monitor IFP 1920x1080.
                </span>
              </div>
            </div>
          </div>

          {/* Reward Badges info */}
          <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Award className="w-5 h-5 text-amber-600" />
              <span>
                <strong>Gelar Penghargaan:</strong> Skor 90-100 (Master Matematika) • 80-89 (Juara Cerdas) • 70-79 (Petualang Hebat) • &lt;70 (Pejuang Matematika).
              </span>
            </div>
          </div>
        </div>

        {/* Footer Close Button */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-sm rounded-xl shadow transition-all"
          >
            SAYA MENGERTI, TUTUP PANDUAN
          </button>
        </div>
      </div>
    </div>
  );
};
