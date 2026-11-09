import React, { useState, useEffect, useMemo } from 'react';
import { Question, LevelInfo, QuestionOption } from '../types/game';
import { soundFX } from '../utils/soundEffects';
import { speechNarration } from '../utils/speechNarration';
import { FeedbackModal } from './FeedbackModal';
import {
  HelpCircle,
  Award,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Flame,
  Volume2,
} from 'lucide-react';

interface Stage2ChallengesProps {
  level: LevelInfo;
  questions: Question[];
  onCompleteChallenges: (results: {
    score: number;
    correctCount: number;
    wrongCount: number;
    total: number;
  }) => void;
}

export const Stage2_Challenges: React.FC<Stage2ChallengesProps> = ({
  level,
  questions,
  onCompleteChallenges,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [lastAnswerWasCorrect, setLastAnswerWasCorrect] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [hasAttemptedCurrent, setHasAttemptedCurrent] = useState(false);

  const currentQuestion: Question | undefined = questions[currentIndex];

  // Randomize options order on question load
  const shuffledOptions: QuestionOption[] = useMemo(() => {
    if (!currentQuestion) return [];
    const copy = [...currentQuestion.options];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, [currentIndex, currentQuestion]);

  // Read question aloud when navigated
  useEffect(() => {
    if (!currentQuestion) return;
    setSelectedOptionId(null);
    setHintVisible(false);
    setHasAttemptedCurrent(false);

    const narrationText = `Soal nomor ${currentIndex + 1}. ${currentQuestion.stimulus} Pertanyaan: ${currentQuestion.questionText}`;
    speechNarration.speak(narrationText);
  }, [currentIndex, currentQuestion]);

  if (!currentQuestion) {
    return null;
  }

  const handleSelectOption = (opt: QuestionOption) => {
    soundFX.playClick();
    setSelectedOptionId(opt.id);

    const isCorrect = opt.isCorrect;
    setLastAnswerWasCorrect(isCorrect);
    setShowFeedbackModal(true);

    if (isCorrect) {
      soundFX.playCorrect();
      if (!hasAttemptedCurrent) {
        setScore((s) => s + 10);
        setCorrectCount((c) => c + 1);
      }
      speechNarration.speak('Hebat sekali! Jawabanmu benar!');
    } else {
      soundFX.playWrong();
      if (!hasAttemptedCurrent) {
        setWrongCount((w) => w + 1);
        setHasAttemptedCurrent(true);
      }
      speechNarration.speak('Jawabanmu belum tepat. Ayo coba lagi dengan petunjuk berikut!');
    }
  };

  const handleTryAgain = () => {
    setShowFeedbackModal(false);
    setSelectedOptionId(null);
    setHintVisible(true);
  };

  const handleNextQuestion = () => {
    setShowFeedbackModal(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((idx) => idx + 1);
    } else {
      // Completed all questions
      soundFX.playFanfare();
      onCompleteChallenges({
        score,
        correctCount: correctCount + (lastAnswerWasCorrect && !hasAttemptedCurrent ? 1 : 0),
        wrongCount,
        total: questions.length,
      });
    }
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 select-none">
      {/* Top Bar: Progress and HUD */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-3 shadow-md border-2 border-red-200 shrink-0">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-red-600 text-white font-black text-xs tracking-wider rounded-xl shadow uppercase">
            SOAL {currentIndex + 1} DARI {questions.length}
          </div>

          <div className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs rounded-xl flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {currentQuestion.category}
          </div>

          <h2 className="hidden md:block font-black text-slate-800 text-base">
            {currentQuestion.title}
          </h2>
        </div>

        {/* Score & Streak HUD */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-yellow-100 border border-yellow-300 px-3 py-1.5 rounded-xl font-black text-sm text-yellow-900">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Skor: {score}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-xl font-black text-sm text-emerald-900">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Benar: {correctCount}</span>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              setHintVisible(!hintVisible);
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 border border-blue-300 text-blue-900 font-extrabold text-xs rounded-xl active:scale-95 transition-all"
            title="Tampilkan petunjuk pengerjaan"
          >
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>{hintVisible ? 'TUTUP PETUNJUK' : 'PETUNJUK'}</span>
          </button>
        </div>
      </div>

      {/* Main Question Card (High Contrast, Large Touch Targets) */}
      <div className="flex-1 my-3 bg-white rounded-3xl p-5 shadow-lg border-2 border-slate-200 flex flex-col justify-between overflow-hidden">
        {/* Stimulus and Question Text */}
        <div className="space-y-3">
          {/* Stimulus Context Box */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-black shrink-0 shadow-sm">
              ℹ
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-extrabold text-red-600 uppercase tracking-wider block">
                Stimulus & Informasi Soal:
              </span>
              <p className="text-base font-bold text-slate-800 leading-relaxed">
                {currentQuestion.stimulus}
              </p>
            </div>
          </div>

          {/* Core Question Prompt */}
          <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300 rounded-2xl p-4">
            <span className="text-xs font-black text-red-700 uppercase tracking-wider block mb-1">
              Pertanyaan:
            </span>
            <p className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
              {currentQuestion.questionText}
            </p>
          </div>

          {/* Conditional Scaffolding Hint */}
          {hintVisible && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 flex items-start gap-2 animate-pop-in">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-black text-amber-800 uppercase">Petunjuk Guru Cerdas:</span>
                <p className="text-sm font-bold text-amber-900">{currentQuestion.hint}</p>
              </div>
            </div>
          )}
        </div>

        {/* 4 Extra-Large Options Grid (Touch-friendly on 75" IFP) */}
        <div className="grid grid-cols-2 gap-4 mt-3">
          {shuffledOptions.map((opt, idx) => {
            const letter = optionLetters[idx];
            const isSelected = selectedOptionId === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                className={`p-4 rounded-2xl border-4 flex items-center gap-4 text-left font-black transition-all active:scale-[0.98] shadow-md group ${
                  isSelected
                    ? 'bg-red-600 border-yellow-400 text-white shadow-xl scale-[1.01]'
                    : 'bg-slate-50 hover:bg-red-50/50 border-slate-300 hover:border-red-400 text-slate-800'
                }`}
              >
                {/* Big Letter Badge */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow shrink-0 transition-transform group-hover:scale-105 ${
                    isSelected
                      ? 'bg-yellow-400 text-red-900 border-2 border-white'
                      : 'bg-white text-red-600 border-2 border-slate-300'
                  }`}
                >
                  {letter}
                </div>

                {/* Option Content Text */}
                <span className="text-lg md:text-xl leading-snug flex-1">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden shrink-0 border border-slate-300">
        <div
          className="bg-gradient-to-r from-red-600 via-amber-400 to-emerald-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Floating Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        isCorrect={lastAnswerWasCorrect}
        selectedOptionText={shuffledOptions.find((o) => o.id === selectedOptionId)?.text}
        correctAnswerText={shuffledOptions.find((o) => o.isCorrect)?.text}
        hint={currentQuestion.hint}
        fullExplanation={currentQuestion.fullExplanation}
        onTryAgain={handleTryAgain}
        onNextQuestion={handleNextQuestion}
        isLastQuestion={currentIndex === questions.length - 1}
      />
    </div>
  );
};
