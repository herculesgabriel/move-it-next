import { useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img
        src="https://github.com/herculesgabriel.png"
        alt="foto de perfil"
        width="50"
      />

      <div>
        <strong>Hercules Gabriel</strong>
        <p>
          <img src="icons/level.svg" alt="nível" />
          Nível {level}
        </p>
      </div>
    </div>
  );
}
