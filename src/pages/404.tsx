import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

const ErrorPage = () => {
  const router = useRouter();
  const path = router.asPath;
  if (path.includes('404')) {
    return (
      <Box textAlign="center" pt={10}>
        <Typography variant="h1">404</Typography>
        <Typography variant="h5">Page Not Found</Typography>
        <Button
          variant="contained"
          onClick={() => {
            // router.push('/');
            window.location.href = '/';
          }}
          sx={{ mt: 4 }}
        >
          Back to home
        </Button>
      </Box>
    );
  } else {
    router.replace(router.asPath);
    return <></>;
  }
};

export default ErrorPage;
