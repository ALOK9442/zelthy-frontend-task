import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

function BigLoader({
  Height
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:`${Height}dvh`,
      }}
    >
      <CircularProgress size={80} />
    </Box>
  );
}

export default BigLoader;
