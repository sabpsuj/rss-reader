import { Box, Button, IconButton, ListItem, TextField, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { Feed } from '@/hooks/useFeeds';
import { type AlertColor } from '@mui/material/Alert';

type Props = {
  feed: Feed;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onUpdate: (data: Partial<Feed>) => void;
  onNotify: (message: string, severity: AlertColor) => void
};

export default function FeedItem({ feed, isSelected, onSelect, onDelete, onUpdate, onNotify }: Props) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(feed.name);
  const [editUrl, setEditUrl] = useState(feed.url);

  return (
    <ListItem
      disablePadding
      sx={{
        display: 'block',
        mb: 1,
        bgcolor: isSelected ? 'action.selected' : undefined,
      }}
      secondaryAction={
        !editing && (
          <Box display="flex" alignItems="center">
            <Tooltip title="Edytuj feed">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setEditing(true);
                  onNotify?.('Feed zaktualizowany', 'success');
                }}
                edge="end"
                size="small"
                sx={{ ml: 1 }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Usuń feed">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                edge="end"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
      onClick={onSelect}
    >
      {editing ? (
        <Box onClick={(e) => e.stopPropagation()}>
          <TextField
            label="Nazwa"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            size="small"
            sx={{ mb: 1, width: '100%' }}
          />
          <TextField
            label="URL"
            value={editUrl}
            onChange={(e) => setEditUrl(e.target.value)}
            size="small"
            sx={{ mb: 1, width: '100%' }}
          />
          <Box display="flex" gap={1}>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                onUpdate({ name: editName, url: editUrl });
                setEditing(false);
              }}
            >
              Zapisz
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setEditing(false);
                setEditName(feed.name);
                setEditUrl(feed.url);
              }}
            >
              Anuluj
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ cursor: 'pointer' }}>
          <Typography variant="body1">{feed.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {feed.url}
          </Typography>
        </Box>
      )}
    </ListItem>
  );
}
