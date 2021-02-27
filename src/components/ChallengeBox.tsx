import { useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { resetCountdown } = useContext(CountdownContext);
  const { activeChallenge, resetChallenge, handleCompletedChallenge } = useContext(
    ChallengesContext
  );

  function handleClickFailed() {
    resetChallenge();
    resetCountdown();
  }

  function handleClickCompleted() {
    handleCompletedChallenge();
    resetCountdown();
  }

  if (activeChallenge) {
    return (
      <div className={styles.challengeBoxContainer}>
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="tipo do desafio" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleClickFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleClickCompleted}
            >
              Completei
            </button>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.challengeBoxContainer}>
      <div className={styles.challengeNotActive}>
        <strong>Finalize um ciclo para receber um desafio.</strong>
        <p>
          <img src="icons/level-up.svg" alt="suba de nível" />
          Avance de nível completando desafios
        </p>
      </div>
    </div>
  );
}
