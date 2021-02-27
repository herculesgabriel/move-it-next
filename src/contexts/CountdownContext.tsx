import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
  isActive: boolean;
  hasFinished: boolean;
  minute: number;
  second: number;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

const CountdownContext = createContext({} as CountdownContextData);

let countdownReference: NodeJS.Timeout;

function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minute = Math.floor(time / 60);
  const second = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownReference);
    setHasFinished(false);
    setIsActive(false);
    setTime(25 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownReference = setTimeout(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(true);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        isActive,
        hasFinished,
        minute,
        second,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}

export { CountdownContext, CountdownProvider };
