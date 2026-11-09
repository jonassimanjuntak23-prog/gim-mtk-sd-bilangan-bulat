/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LevelId, LevelInfo, LevelProgress } from './types/game';
import { LEVELS_CONFIG } from './data/levelsData';
import { getStoredProgress, saveLevelProgress, resetAllProgress, calculateBadge, calculateStars } from './utils/storage';
import { getQuestionsForLevel } from './utils/mathLogic';
import { speechNarration } from './utils/speechNarration';
import { soundFX } from './utils/soundEffects';

import { HeaderNav } from './components/HeaderNav';
import { HomeView } from './components/HomeView';
import { LevelSelectView } from './components/LevelSelectView';
import { Stage1_Concept } from './components/Stage1_Concept';
import { Stage2_Challenges } from './components/Stage2_Challenges';
import { Stage3_Reflection } from './components/Stage3_Reflection';
import { LevelSummaryModal } from './components/LevelSummaryModal';
import { HelpModal } from './components/HelpModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';

type AppView = 'home' | 'level_select' | 'stage1' | 'stage2' | 'stage3' | 'level_summary';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedLevel, setSelectedLevel] = useState<LevelInfo>(LEVELS_CONFIG[0]);
  const [progressMap, setProgressMap] = useState<Record<LevelId, LevelProgress>>(getStoredProgress());
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Results of the currently completed level session
  const [sessionResults, setSessionResults] = useState<{
    score: number;
    correctCount: number;
    wrongCount: number;
    total: number;
  }>({
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    total: 10,
  });

  // Support ?autostart=1 or ?level=1 for fast verification
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('autostart') === '1') {
        const lvlParam = parseInt(urlParams.get('level') || '1') as LevelId;
        const target = LEVELS_CONFIG.find((l) => l.id === lvlParam) || LEVELS_CONFIG[0];
        setSelectedLevel(target);
        setCurrentView('level_select');
      }
    }
  }, []);

  // Update voice greeting when entering Home or Level Select
  useEffect(() => {
    if (currentView === 'home') {
      speechNarration.speak(
        'Selamat datang di Petualangan Matematika Cerdas SD Kristen Teramia! Berhitung, Berpikir, dan Menjadi Juara!'
      );
    } else if (currentView === 'level_select') {
      speechNarration.speak(
        'Silakan pilih salah satu dari lima level petualangan matematika berikut. Semua level bebas dipilih!'
      );
    }
  }, [currentView]);

  // Navigation handlers
  const handleGoHome = () => {
    speechNarration.stop();
    setCurrentView('home');
  };

  const handleGoBack = () => {
    speechNarration.stop();
    if (currentView === 'level_summary' || currentView === 'stage3') {
      setCurrentView('level_select');
    } else if (currentView === 'stage2') {
      setCurrentView('stage1');
    } else if (currentView === 'stage1') {
      setCurrentView('level_select');
    } else if (currentView === 'level_select') {
      setCurrentView('home');
    }
  };

  const handleRestartLevel = () => {
    speechNarration.stop();
    setCurrentView('stage1');
  };

  const handleSelectLevel = (lvl: LevelInfo) => {
    setSelectedLevel(lvl);
    setCurrentView('stage1');
  };

  const handleProceedToStage2 = () => {
    setCurrentView('stage2');
  };

  const handleCompleteChallenges = (results: {
    score: number;
    correctCount: number;
    wrongCount: number;
    total: number;
  }) => {
    setSessionResults(results);
    setCurrentView('stage3');
  };

  const handleFinishReflection = (reflectionAnswers: Record<string, string>) => {
    const finalScore = sessionResults.score;
    const finalBadge = calculateBadge(finalScore);
    const finalStars = calculateStars(finalScore);

    const updatedProg: LevelProgress = {
      levelId: selectedLevel.id,
      score: Math.max(progressMap[selectedLevel.id]?.score || 0, finalScore),
      totalAnswered: sessionResults.total,
      correctCount: sessionResults.correctCount,
      wrongCount: sessionResults.wrongCount,
      stars: Math.max(progressMap[selectedLevel.id]?.stars || 0, finalStars),
      badge: finalBadge,
      completed: true,
      reflectionCompleted: true,
      reflectionAnswers,
      lastPlayed: new Date().toISOString(),
    };

    saveLevelProgress(updatedProg);
    setProgressMap(getStoredProgress());
    setCurrentView('level_summary');

    speechNarration.speak(
      `Selamat! Kamu berhasil menuntaskan tantangan dan refleksi ${selectedLevel.title} dengan skor ${finalScore} dan meraih gelar ${finalBadge}!`
    );
  };

  const handleResetConfirm = () => {
    resetAllProgress();
    setProgressMap(getStoredProgress());
    setIsResetConfirmOpen(false);
    soundFX.playClick();
  };

  // Get active questions for selected level
  const activeQuestions = getQuestionsForLevel(selectedLevel.id);

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col bg-slate-950 font-sans select-none text-slate-900">
      {/* 16:9 Aspect Fixed IFP Canvas Container */}
      <div className="w-full h-full flex flex-col overflow-hidden max-w-[1920px] max-h-[1080px] mx-auto bg-white shadow-2xl relative">
        {/* Top Header Navigation */}
        <HeaderNav
          currentView={currentView}
          currentLevelId={selectedLevel?.id}
          onGoHome={handleGoHome}
          onGoBack={handleGoBack}
          onRestartLevel={handleRestartLevel}
          onOpenHelp={() => setIsHelpOpen(true)}
          title={
            currentView === 'home'
              ? 'PETUALANGAN MATEMATIKA CERDAS'
              : currentView === 'level_select'
              ? 'PILIH LEVEL PETUALANGAN'
              : selectedLevel.title
          }
          subtitle={
            currentView !== 'home' && currentView !== 'level_select'
              ? selectedLevel.numberStr
              : undefined
          }
        />

        {/* View Switcher: Single-Screen, Zero Scrolling */}
        <main className="flex-1 w-full h-[calc(100vh-4rem)] overflow-hidden relative">
          {currentView === 'home' && (
            <HomeView
              onStartAdventure={() => setCurrentView('level_select')}
              onOpenHelp={() => setIsHelpOpen(true)}
            />
          )}

          {currentView === 'level_select' && (
            <LevelSelectView
              progressMap={progressMap}
              onSelectLevel={handleSelectLevel}
              onResetProgress={() => setIsResetConfirmOpen(true)}
            />
          )}

          {currentView === 'stage1' && (
            <Stage1_Concept
              level={selectedLevel}
              onProceedToStage2={handleProceedToStage2}
            />
          )}

          {currentView === 'stage2' && (
            <Stage2_Challenges
              level={selectedLevel}
              questions={activeQuestions}
              onCompleteChallenges={handleCompleteChallenges}
            />
          )}

          {currentView === 'stage3' && (
            <Stage3_Reflection
              level={selectedLevel}
              earnedScore={sessionResults.score}
              onFinishLevel={handleFinishReflection}
            />
          )}

          {currentView === 'level_summary' && (
            <LevelSummaryModal
              level={selectedLevel}
              results={sessionResults}
              onPlayAgain={() => setCurrentView('stage1')}
              onChooseOtherLevel={() => setCurrentView('level_select')}
              onGoHome={handleGoHome}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <ResetConfirmModal
        isOpen={isResetConfirmOpen}
        onConfirm={handleResetConfirm}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
}
