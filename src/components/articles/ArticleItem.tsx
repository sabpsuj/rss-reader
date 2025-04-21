import { Box, Link, ListItem, Typography } from '@mui/material';
import { type Article } from '@/types/Article';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { type AlertColor } from '@mui/material/Alert';

type Props = {
  article: Article;
  onToggleFavorite: (link: string) => void;
  onToggleRead: (link: string) => void;
  onSelect: () => void;
  onNotify: (message: string, status: AlertColor) => void;
};

export default function ArticleItem({ article, onToggleFavorite, onToggleRead, onSelect, onNotify }: Props) {
  return (
    <ListItem sx={{ display: 'block', mb: 2, cursor: 'pointer' }} onClick={onSelect}>
      <Typography
        variant="subtitle1"
        sx={{ textDecoration: article.isRead ? 'line-through' : 'none' }}
      >
        {article.title}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(article.pubDate).toLocaleString()}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
        {article.contentSnippet}
      </Typography>
      <Link href={article.link} target="_blank" rel="noopener noreferrer">
        Czytaj więcej
      </Link>
      <Box mt={1}>
        <Tooltip title={article.isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(article.link);
              onNotify?.(
                article.isFavorite ? 'Usunięto z ulubionych' : 'Dodano do ulubionych',
                'info'
              );
            }}
            size="small"
            color={article.isFavorite ? 'warning' : 'default'}
          >
            {article.isFavorite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title={article.isRead ? 'Oznacz jako nieprzeczytany' : 'Oznacz jako przeczytany'}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onToggleRead(article.link);
              onNotify?.(
                article.isRead ? 'Usunięto z przeczytanych' : 'Dodano do przeczytanych',
                'info'
              );
            }}
            size="small"
          >
            {article.isRead ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </ListItem>
  );
}
