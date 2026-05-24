import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase/config';
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [personal, about, skills, extras] = await Promise.all([
          getDoc(doc(db, 'personal', 'data')),
          getDoc(doc(db, 'about', 'data')),
          getDoc(doc(db, 'skills', 'data')),
          getDoc(doc(db, 'extras', 'data')),
        ]);

        const [expSnap, projSnap, eduSnap, certSnap, badgeSnap] =
          await Promise.all([
            getDocs(query(collection(db, 'experience'), orderBy('order'))),
            getDocs(query(collection(db, 'projects'), orderBy('order'))),
            getDocs(query(collection(db, 'education'), orderBy('order'))),
            getDocs(
              query(collection(db, 'certifications'), orderBy('order'))
            ),
            getDocs(collection(db, 'badges')),
          ]);

        setData({
          personal: personal.data(),
          about: about.data(),
          skills: skills.data(),
          extras: extras.data(),
          experience: expSnap.docs.map((d) => d.data()),
          projects: projSnap.docs.map((d) => d.data()),
          education: eduSnap.docs.map((d) => d.data()),
          certifications: certSnap.docs.map((d) => d.data()),
          badges: badgeSnap.docs.map((d) => d.data()),
        });
      } catch (e) {
        console.error('❌ Error fetching portfolio data:', e);
        setError(e);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  const value = { data, loading, error };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

// Hook para consumir el context
export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio debe usarse dentro de <PortfolioProvider>');
  return ctx;
}