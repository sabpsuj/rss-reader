import { Box, Container, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 4, py: 2, borderTop: '1px solid #ddd' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} <Link href="https://sabinapsuj.dev" target="_blank" rel="noopener">Sabina Psuj</Link>
        </Typography>
      </Container>
    </Box>
  );
}
