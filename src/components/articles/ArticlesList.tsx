import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  Paper,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import { type Article } from '@/types/Article';
import ArticleItem from './ArticleItem';
import { useFilteredArticles } from '@/hooks/useFilteredArticles';
import { type AlertColor } from '@mui/material/Alert';

type Props = {
  articles: Article[];
  loading: boolean;
  searchQuery: string;
  showFavoritesOnly: boolean;
  showUnreadOnly: boolean;
  onSearchChange: (value: string) => void;
  onToggleFavorite: (link: string) => void;
  onToggleRead: (link: string) => void;
  onToggleFavoritesOnly: () => void;
  onToggleUnreadOnly: () => void;
  onSelectArticle: (article: Article) => void;
  onNotify: (message: string, status: AlertColor) => void;
};

export default function ArticleList({
  articles,
  loading,
  searchQuery,
  showFavoritesOnly,
  showUnreadOnly,
  onSearchChange,
  onToggleFavorite,
  onToggleRead,
  onToggleFavoritesOnly,
  onToggleUnreadOnly,
  onSelectArticle,
  onNotify
}: Props) {
  const filteredArticles = useFilteredArticles({
    articles,
    showFavoritesOnly,
    showUnreadOnly,
    searchQuery,
  });

  return (
    <Paper sx={{ p: 2, height: '80vh', overflowY: 'auto' }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box display="flex" gap={1} mb={2}>
            <Button variant="outlined" onClick={onToggleFavoritesOnly}>
              {showFavoritesOnly ? 'Pokaż wszystkie' : 'Pokaż ulubione'}
            </Button>
            <Button variant="outlined" onClick={onToggleUnreadOnly}>
              {showUnreadOnly ? 'Pokaż wszystkie' : 'Pokaż nieprzeczytane'}
            </Button>
          </Box>

          <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="search">Szukaj po tytule</InputLabel>
            <Input
              id="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              endAdornment={
                searchQuery && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => onSearchChange('')} edge="end">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            />
          </FormControl>

          {filteredArticles.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Brak wyników.
            </Typography>
          ) : (
            <List>
              {filteredArticles.map((article) => (
                <ArticleItem
                  key={article.link}
                  article={article}
                  onToggleFavorite={onToggleFavorite}
                  onToggleRead={onToggleRead}
                  onSelect={() => onSelectArticle(article)}
                  onNotify={onNotify}
                />
              ))}
            </List>
          )}
        </>
      )}
    </Paper>
  );
}
