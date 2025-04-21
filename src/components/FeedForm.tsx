import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

type FeedFormProps = {
  onAdd: (name: string, url: string) => void;
};

export default function FeedForm({ onAdd }: FeedFormProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name && url) {
      onAdd(name, url);
      setName('');
      setUrl('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label="Nazwa feeda"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="RSS URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Dodaj feed
      </Button>
    </Box>
  );
}
