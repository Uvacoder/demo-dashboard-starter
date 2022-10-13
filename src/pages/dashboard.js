import { promises as fs } from 'fs';
import Head from 'next/head';
import Image from 'next/image';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';

import styles from '../styles/Dashboard.module.scss';

export default function Dashboard({ watched, tracking, favorites }) {
  return (
    <Layout>
      <Head>
        <title>Dashboard - TV Tracker</title>
        <meta name="description" content="My shows tracked!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="sr-only">My Shows</h1>

      <Section>
        <Container>
          <ul className={styles.stats}>
            <li>
              <p className={styles.statsStat}>{ watched.length }</p>
              <h3 className={styles.statsTitle}>Favorites</h3>
            </li>
            <li>
              <p className={styles.statsStat}>{ tracking.length }</p>
              <h3 className={styles.statsTitle}>Tracking</h3>
            </li>
            <li>
              <p className={styles.statsStat}>{ favorites.length }</p>
              <h3 className={styles.statsTitle}>Watched</h3>
            </li>
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className={styles.heading}>Favorites</h2>

          <ul className={styles.shows}>
            {favorites.map(show => {
              return (
                <li>
                  <img src={show.image.medium} alt={`${show.name} Poster`} />
                  <h3 className={styles.showsTitle}>{ show.name }</h3>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className={styles.heading}>Tracking</h2>

          <ul className={styles.shows}>
            {tracking.map(show => {
              return (
                <li>
                  <img src={show.image.medium} alt={`${show.name} Poster`} />
                  <h3 className={styles.showsTitle}>{ show.name }</h3>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className={styles.heading}>Watched</h2>

          <ul className={styles.shows}>
            {watched.map(show => {
              return (
                <li>
                  <img src={show.image.medium} alt={`${show.name} Poster`} />
                  <h3 className={styles.showsTitle}>{ show.name }</h3>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>
    </Layout>
  )
}

export async function getServerSideProps() {
  // Show data from https://www.tvmaze.com/api
  const location = './src/data';
  const files = await fs.readdir(location);
  const shows = await Promise.all(files.map(async filename =>{
    const data = await fs.readFile(`${location}/${filename}`, { encoding: 'utf8' });
    return JSON.parse(data);
  }));
  return {
    props: {
      watched: shows,
      tracking: [...shows].sort(() => 0.5 - Math.random()).slice(0,6),
      favorites: [...shows].sort(() => 0.5 - Math.random()).slice(0,3),
    }
  }
}