import { useMemo } from 'react';
import { Article } from '@/types/Article';

type Options = {
  articles: Article[];
  showFavoritesOnly: boolean;
  showUnreadOnly: boolean;
  searchQuery: string;
};

export function useFilteredArticles({
  articles,
  showFavoritesOnly,
  showUnreadOnly,
  searchQuery,
}: Options): Article[] {
  return useMemo(() => {
    return articles
      .filter((a) => (showFavoritesOnly ? a.isFavorite : true))
      .filter((a) => (showUnreadOnly ? !a.isRead : true))
      .filter((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      );
  }, [articles, showFavoritesOnly, showUnreadOnly, searchQuery]);
}
