import { useEffect, useState } from 'react';

export type ArticleState = {
  isRead?: boolean;
  isFavorite?: boolean;
};

const STORAGE_KEY = 'article-states';

type ArticleStates = Record<string, ArticleState>;

export function useArticleState() {
  const [states, setStates] = useState<ArticleStates>({});

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      try {
        setStates(JSON.parse(raw));
      } catch (error) {
        console.error('Invalid article state in localStorage');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
  }, [states]);

  const toggleRead = (link: string) => {
    setStates((prev) => ({
      ...prev,
      [link]: { ...prev[link], isRead: !prev[link]?.isRead },
    }));
  };

  const toggleFavorite = (link: string) => {
    setStates((prev) => ({
      ...prev,
      [link]: { ...prev[link], isFavorite: !prev[link]?.isFavorite },
    }));
  };

  return {
    states,
    toggleRead,
    toggleFavorite,
  };
}
