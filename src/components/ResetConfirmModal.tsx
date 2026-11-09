import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-pop-in select-none">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-red-500">
        <div className="p-4 bg-red-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-yellow-300" />
            <h3 className="text-lg font-black tracking-tight">KONFIRMASI RESET DATA</h3>
          </div>
          <button
            onClick={() => {
              soundFX.playClick();
              onCancel();
            }}
            className="p-1 rounded-lg hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-center space-y-3">
          <p className="text-sm font-bold text-slate-700 leading-relaxed">
            Apakah Bapak/Ibu Guru atau siswa yakin ingin mereset seluruh skor, bintang, dan riwayat refleksi pada game ini?
          </p>
          <p className="text-xs font-semibold text-red-500">
            Tindakan ini akan mengembalikan seluruh level ke kondisi awal.
          </p>

          <div className="flex items-center gap-3 pt-3">
            <button
              onClick={() => {
                soundFX.playClick();
                onCancel();
              }}
              className="flex-1 py-3 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold text-sm rounded-xl active:scale-95 transition-all"
            >
              BATALKAN
            </button>
            <button
              onClick={() => {
                soundFX.playClick();
                onConfirm();
              }}
              className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-xl active:scale-95 transition-all shadow-lg flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>YA, RESET DATA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
