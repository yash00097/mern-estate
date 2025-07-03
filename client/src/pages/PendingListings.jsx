import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const AdminListingCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[4],
  },
}));

export default function PendingListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingListings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/listing/pending', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        
        const data = await response.json();
        setListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPendingListings();
  }, []);

  const handleStatusUpdate = async (id, action) => {
    setUpdatingId(id);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/listing/${action}/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Update failed');
      }
      
      setListings(prev => prev.filter(listing => listing._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  if (listings.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ p: 3, color: 'text.secondary' }}>
        No pending listings to review
      </Typography>
    );
  }

  return (
  <Box sx={{ p: 2 }}>
    {error && (
      <Alert severity="error" sx={{ mb: 2 }} className="dark:bg-red-800 dark:text-white">
        {error}
      </Alert>
    )}

    <Grid container spacing={2}>
      {listings.map((listing) => (
        <Grid item xs={12} sm={6} md={4} key={listing._id}>
          <AdminListingCard className="bg-white dark:bg-gray-800 dark:text-gray-100">
            <CardHeader
              avatar={
                <Avatar
                  src={listing.user?.avatar}
                  alt={listing.user?.username}
                  sx={{ bgcolor: '#f44336' }}
                  className="dark:border dark:border-gray-700"
                />
              }
              title={listing.user?.username || 'Unknown User'}
              subheader={new Date(listing.createdAt).toLocaleDateString()}
              subheaderTypographyProps={{
                        className: 'text-gray-600 dark:text-gray-400'
                    }}
              className="dark:border-b dark:border-gray-700"
            />

            <CardMedia
            component="div"
            className="dark:border-b dark:border-gray-700 cursor-grab active:cursor-grabbing"
            >
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000 }}
                className="h-[194px]"
            >
                {listing.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                    <img
                    src={url}
                    alt={`${listing.name} ${index + 1}`}
                    className="w-full h-[194px] object-cover rounded-t"
                    />
                </SwiperSlide>
                ))}
            </Swiper>
            </CardMedia>

            <CardContent className="dark:text-gray-100">
              <Typography gutterBottom variant="h6" component="div">
                {listing.name}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} className="dark:text-gray-400">
                {listing.description}
              </Typography>

              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Address:</strong> {listing.address}
              </Typography>

              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Price:</strong> ${listing.regularPrice.toLocaleString()}
                {listing.discountPrice > 0 && (
                  <span className="text-green-600 font-semibold ml-1">
                    {'→ $' + listing.discountPrice.toLocaleString()}
                  </span>
                )}
              </Typography>

              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Rooms:</strong> {listing.bedrooms} BR | {listing.bathrooms} BA
              </Typography>

              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Features:</strong>
                {listing.furnished && ' Furnished'}
                {listing.parking && ' Parking'}
              </Typography>

              <Typography variant="body2">
                <strong>Type:</strong> {listing.type} |
                <strong> Offer:</strong> {listing.offer ? ' Yes' : ' No'}
              </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between', p: 2 }} className="dark:border-t dark:border-gray-700">
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}
                disabled={updatingId === listing._id}
                onClick={() => handleStatusUpdate(listing._id, 'approve')}
                sx={{ flex: 1, mr: 1 }}
                className="dark:bg-green-700 dark:hover:bg-green-800"
              >
                {updatingId === listing._id ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  'Approve'
                )}
              </Button>

              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                disabled={updatingId === listing._id}
                onClick={() => handleStatusUpdate(listing._id, 'reject')}
                sx={{ flex: 1, ml: 1 }}
                className="dark:border-red-500 dark:text-red-500 dark:hover:bg-red-800"
              >
                Reject
              </Button>
            </CardActions>
          </AdminListingCard>
        </Grid>
      ))}
    </Grid>
  </Box>
);

}