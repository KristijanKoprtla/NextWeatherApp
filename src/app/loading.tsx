import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
	return (
		<Box height="100vh" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<CircularProgress size={100} />
		</Box>
	);
};

export default Loading;
