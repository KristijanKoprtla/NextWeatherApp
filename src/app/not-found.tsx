import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

const Custom404 = () => {
	return (
		<Box
			margin={10}
			display="flex"
			flexDirection="column"
			gap={5}
			justifyContent="center"
			alignItems="center"
			height="70vh"
		>
			<Typography component="h1" variant="h2">
				404 - Page Not Found
			</Typography>
			<Button variant="contained" color="success">
				<Link href="/">Go back to Home</Link>
			</Button>
		</Box>
	);
};

export default Custom404;
