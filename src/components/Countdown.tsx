import { useEffect, useState } from 'react';
import styles from '../styles/components/Countdown.module.css';

const ExperienceBar = () => {
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

  const minute = Math.floor(time / 60);
  const second = time % 60;

  const [minuteLeft, minuteRight] = minute.toString().padStart(2, '0').split('');
  const [secondLeft, secondRight] = second.toString().padStart(2, '0').split('');

  function startCountdown() {
    setActive(true);
  }

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    }
  }, [active, time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      <button 
        type="button" 
        className={styles.countdownButton} 
        onClick={startCountdown}
      >
        Iniciar um ciclo
      </button>
    </div>
  );
};

export default ExperienceBar;
