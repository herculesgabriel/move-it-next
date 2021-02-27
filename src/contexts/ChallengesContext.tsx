import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  completedChallenges: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  closeLevelUpModal: () => void;
  handleCompletedChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  cookies: {
    level: number;
    currentExperience: number;
    completedChallenges: number;
  };
}

const ChallengesContext = createContext({} as ChallengesContextData);

function ChallengesProvider({ children, cookies }: ChallengesProviderProps) {
  const [level, setLevel] = useState(cookies.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    cookies.currentExperience ?? 0
  );
  const [completedChallenges, setCompletedChallenges] = useState(
    cookies.completedChallenges ?? 0
  );

  const [activeChallenge, setActiveChallenge] = useState<Challenge>(null);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function closeLevelUpModal() {
    setIsLevelModalOpen(false);
  }

  function handleCompletedChallenge() {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    resetChallenge();
    setCompletedChallenges(completedChallenges + 1);
    setCurrentExperience(finalExperience);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex] as Challenge;

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio! 🎉', {
        body: `Valendo ${challenge.amount} xp`,
      });
    }
  }

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('completedChallenges', String(completedChallenges));
  }, [level, currentExperience, completedChallenges]);

  return (
    <ChallengesContext.Provider
      value={{
        level,
        activeChallenge,
        currentExperience,
        completedChallenges,
        experienceToNextLevel,
        handleCompletedChallenge,
        startNewChallenge,
        resetChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}

export { ChallengesContext, ChallengesProvider };
