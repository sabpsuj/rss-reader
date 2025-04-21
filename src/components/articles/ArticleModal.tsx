import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button,
    Typography,
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  
  import { type Article } from '@/types/Article';
  
  type Props = {
    article: Article | null;
    onClose: () => void;
  };
  
  export default function ArticleModal({ article, onClose }: Props) {
    return (
      <Dialog open={!!article} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          {article?.title}
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <DialogContent dividers>
          <Typography variant="caption" color="text.secondary">
            {article?.pubDate ? new Date(article.pubDate).toLocaleString() : ''}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {article?.contentSnippet || 'Brak podglądu'}
          </Typography>
        </DialogContent>
  
        <DialogActions>
          <Button
            href={article?.link || ''}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
          >
            Otwórz artykuł
          </Button>
          <Button onClick={onClose}>Zamknij</Button>
        </DialogActions>
      </Dialog>
    );
  }
  