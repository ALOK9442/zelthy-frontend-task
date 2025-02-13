import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

function BigLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress size={80} />
    </Box>
  );
}

export default BigLoader;
