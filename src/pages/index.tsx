import { GetServerSideProps } from 'next';
import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  completedChallenges: number;
}

export default function Home(props: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>

      <ChallengesProvider cookies={{ ...props }}>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </ChallengesProvider>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, completedChallenges } = context.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      completedChallenges: Number(completedChallenges),
    },
  };
};
