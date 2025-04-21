import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type Feed = {
  id: string;
  name: string;
  url: string;
};

const STORAGE_KEY = 'rss-feed';

export function useFeeds() {
  const [feeds, setFeeds] = useState<Feed[]>([]);

  useEffect(() => {
    const storedFeeds = localStorage.getItem(STORAGE_KEY);

    if (storedFeeds) {
      try {
        setFeeds(JSON.parse(storedFeeds));
      } catch (error) {
        console.error('Invalid JSON in localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feeds));
  }, [feeds]);

  const addFeed = (name: string, url: string) => {
    const newFeed = { id: uuidv4(), name, url };
    setFeeds((prev) => [...prev, newFeed]);
  };

  const deleteFeed = (id: string) => {
    setFeeds((prev) => prev.filter((feed) => feed.id !== id));
  };

  const updateFeed = (id: string, updatedData: Partial<Feed>) => {
    setFeeds((prev) => prev.map((f) => f.id === id ? {...f, ...updatedData} : f))
  };

  return { feeds, addFeed, deleteFeed, updateFeed };
}
