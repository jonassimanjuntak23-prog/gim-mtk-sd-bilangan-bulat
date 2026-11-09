import React from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Lightbulb, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface FeedbackModalProps {
  isOpen: boolean;
  isCorrect: boolean;
  selectedOptionText?: string;
  correctAnswerText?: string;
  hint: string;
  fullExplanation: string;
  onTryAgain: () => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  isCorrect,
  selectedOptionText,
  correctAnswerText,
  hint,
  fullExplanation,
  onTryAgain,
  onNextQuestion,
  isLastQuestion,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-pop-in">
      <div
        className={`w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border-4 ${
          isCorrect ? 'border-emerald-400' : 'border-amber-400'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`p-5 text-white flex items-center justify-between ${
            isCorrect
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
              : 'bg-gradient-to-r from-amber-500 to-orange-600'
          }`}
        >
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <div className="p-2 bg-white/20 rounded-2xl animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-yellow-300" />
              </div>
            ) : (
              <div className="p-2 bg-white/20 rounded-2xl animate-pulse">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
            )}
            <div>
              <h3 className="text-2xl font-black tracking-tight drop-shadow">
                {isCorrect ? 'LUAR BIASA! JAWABANMU BENAR!' : 'TETAP SEMANGAT! AYO COBA LAGI!'}
              </h3>
              <p className="text-xs font-semibold text-white/90">
                {isCorrect
                  ? 'Kamu berpikir dengan cermat dan tepat!'
                  : 'Kesalahan adalah bagian penting dari proses belajar.'}
              </p>
            </div>
          </div>

          {isCorrect && (
            <div className="flex items-center gap-1 bg-yellow-400 text-red-900 px-3 py-1.5 rounded-xl font-black text-sm shadow">
              <Sparkles className="w-4 h-4" />
              +10 Poin!
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Explanation Box */}
          <div
            className={`p-4 rounded-2xl border-2 ${
              isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb
                className={`w-5 h-5 ${isCorrect ? 'text-emerald-600' : 'text-amber-600'}`}
              />
              <span
                className={`font-black text-sm uppercase tracking-wide ${
                  isCorrect ? 'text-emerald-900' : 'text-amber-900'
                }`}
              >
                {isCorrect ? 'Pembahasan Matematika:' : 'Petunjuk Bantuan (Scaffolding):'}
              </span>
            </div>

            <p className="text-sm font-bold text-slate-800 leading-relaxed whitespace-pre-line">
              {isCorrect ? fullExplanation : hint}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {!isCorrect && (
              <button
                onClick={() => {
                  soundFX.playClick();
                  onTryAgain();
                }}
                className="flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 active:scale-95 transition-all text-white font-extrabold text-base rounded-2xl shadow-lg border-2 border-amber-300"
              >
                <RotateCcw className="w-5 h-5" />
                <span>COBA LAGI</span>
              </button>
            )}

            <button
              onClick={() => {
                soundFX.playClick();
                onNextQuestion();
              }}
              className={`flex items-center gap-2 px-8 py-3.5 text-white font-black text-base rounded-2xl shadow-xl transition-all active:scale-95 ${
                isCorrect
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-2 border-yellow-300'
                  : 'bg-slate-700 hover:bg-slate-800 border border-slate-600'
              }`}
            >
              <span>{isLastQuestion ? 'SELESAIKAN LEVEL' : isCorrect ? 'SOAL BERIKUTNYA' : 'LEWATI & LIHAT PEMBAHASAN'}</span>
              <ArrowRight className="w-5 h-5 text-yellow-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
