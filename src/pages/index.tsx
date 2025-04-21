import { Box, Container, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useFeeds, type Feed } from '@/hooks/useFeeds';
import { useState } from 'react';
import { useArticleState } from '@/hooks/useArticleState';
import FeedsList from '@/components/feeds/FeedsList';
import ArticleList from '@/components/articles/ArticlesList';
import { type Article } from '@/types/Article';
import ArticleModal from '@/components/articles/ArticleModal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

export default function Home() {
  const { feeds, addFeed, deleteFeed, updateFeed } = useFeeds();
  const { states, toggleRead, toggleFavorite } = useArticleState();

  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');

  const fetchArticles = async (url: string) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/rss?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      setArticles(data.items || []);
    } catch (error) {
      console.error('Error fetching RSS:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFeed = (feed: Feed) => {
    setSelectedFeed(feed);
    fetchArticles(feed.url);
  };

  const showSnackbar = (message: string, severity: AlertColor = 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Czytnik RSS
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FeedsList
              feeds={feeds}
              selectedFeedId={selectedFeed?.id || null}
              onSelect={handleSelectFeed}
              onAdd={addFeed}
              onDelete={deleteFeed}
              onUpdate={updateFeed}
              onNotify={showSnackbar}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            {selectedFeed ? (
              <ArticleList
                articles={articles.map((a) => ({
                  ...a,
                  ...states[a.link],
                }))}
                loading={loading}
                searchQuery={searchQuery}
                showFavoritesOnly={showFavoritesOnly}
                showUnreadOnly={showUnreadOnly}
                onSearchChange={setSearchQuery}
                onToggleFavorite={toggleFavorite}
                onToggleRead={toggleRead}
                onToggleFavoritesOnly={() => setShowFavoritesOnly((prev) => !prev)}
                onToggleUnreadOnly={() => setShowUnreadOnly((prev) => !prev)}
                onSelectArticle={setSelectedArticle}
                onNotify={showSnackbar}
              />
            ) : (
              <Paper sx={{ p: 2, height: '80vh' }}>
                <Typography variant="body1" color="text.secondary">
                  Wybierz feed, aby zobaczyć artykuły.
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}
