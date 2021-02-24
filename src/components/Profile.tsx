import styles from "../styles/components/Profile.module.css";

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://github.com/herculesgabriel.png"
        alt="Hercules Gabriel"
        width="50"
      />

      <div>
        <strong>Hercules Gabriel</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          Level 1
        </p>
      </div>
    </div>
  );
}
