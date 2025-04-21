import {
  Typography,
  Divider,
  List,
  Paper,
} from '@mui/material';

import FeedForm from '../FeedForm';
import { type Feed } from '@/hooks/useFeeds';
import FeedItem from './FeedItem';
import { type AlertColor } from '@mui/material/Alert';

type Props = {
  feeds: Feed[];
  selectedFeedId: string | null;
  onSelect: (feed: Feed) => void;
  onAdd: (name: string, url: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<Feed>) => void;
  onNotify: (message: string, status: AlertColor) => void;
};

export default function FeedsList({
  feeds,
  selectedFeedId,
  onSelect,
  onAdd,
  onDelete,
  onUpdate,
  onNotify
}: Props) {

  return (
    <Paper sx={{ p: 2, height: '80vh', overflowY: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Feedy
      </Typography>

      <FeedForm onAdd={onAdd} />

      <Divider sx={{ my: 2 }} />

      <List>
        {feeds.map((feed) => (
          <FeedItem
            key={feed.id}
            feed={feed}
            isSelected={selectedFeedId === feed.id}
            onSelect={() => onSelect(feed)}
            onDelete={() => onDelete(feed.id)}
            onUpdate={(data) => onUpdate(feed.id, data)}
            onNotify={onNotify}
          />
        ))}
      </List>
    </Paper>
  );
}
