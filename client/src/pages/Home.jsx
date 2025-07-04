import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Home = () => {
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(location.state?.showAlert || false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
      <div>
        {showAlert && (
          <Alert
            variant="outlined"
            severity="success"
            className='dark:text-green-500'
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setShowAlert(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Your listing is in verification process.You see the status of the listing in your profile.
          </Alert>
        )}

      </div>
    );
}

export default Home