import { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  IconButton,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { Favorite, FavoriteBorder, Search } from '@mui/icons-material';
import axios from 'axios';

const OMDB_API_KEY = '49afaec0'; // You should ideally store this in an environment variable

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedMovie, setSelectedMovie] = useState(null); // For displaying movie details
  const [detailsLoading, setDetailsLoading] = useState(false); // Loading state for details

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const searchMovie = async () => {
    if (!searchTerm) {
      setSnackbar({
        open: true,
        message: 'Please enter a movie name',
        severity: 'warning'
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${OMDB_API_KEY}`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setSnackbar({
          open: true,
          message: 'No movies found!',
          severity: 'error'
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error fetching movie details',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    setDetailsLoading(true);
    try {
      const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`);
      if (response.data.Response === 'True') {
        setSelectedMovie(response.data);
      } else {
        setSnackbar({
          open: true,
          message: 'Error fetching detailed movie information',
          severity: 'error'
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error fetching detailed movie information',
        severity: 'error'
      });
    } finally {
      setDetailsLoading(false);
    }
  };

  const toggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
      setSnackbar({
        open: true,
        message: 'Removed from favorites',
        severity: 'info'
      });
    } else {
      setFavorites([...favorites, movie]);
      setSnackbar({
        open: true,
        message: 'Added to favorites',
        severity: 'success'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Movie Search
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 4 }}>
          <TextField
            label="Enter movie name"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchMovie()}
            sx={{ width: '60%' }}
          />
          <Button
            variant="contained"
            onClick={searchMovie}
            startIcon={<Search />}
            sx={{ px: 4 }}
          >
            Search
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {movies.map((movie) => (
            <Card
              key={movie.imdbID}
              sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
              onClick={() => fetchMovieDetails(movie.imdbID)}
            >
              <CardMedia
                component="img"
                height="400"
                image={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                alt={movie.Title}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" component="h3">
                    {movie.Title}
                  </Typography>
                  <IconButton onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering card click
                    toggleFavorite(movie);
                  }}>
                    {favorites.some((fav) => fav.imdbID === movie.imdbID) ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {movie.Year}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Movie Details Dialog */}
      {selectedMovie && (
        <Dialog open onClose={handleCloseDetails} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedMovie.Title}</DialogTitle>
          <DialogContent>
            {detailsLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <CircularProgress size={60} />
              </Box>
            ) : (
              <Box>
                <img
                  src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'https://via.placeholder.com/300x450'}
                  alt={selectedMovie.Title}
                  style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }}
                />
                <Typography variant="body1" gutterBottom>
                  <strong>Year:</strong> {selectedMovie.Year}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Genre:</strong> {selectedMovie.Genre}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Director:</strong> {selectedMovie.Director}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Actors:</strong> {selectedMovie.Actors}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Plot:</strong> {selectedMovie.Plot}
                </Typography>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
