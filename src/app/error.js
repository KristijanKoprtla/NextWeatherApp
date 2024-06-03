'use client';

import { Box, Typography, Button, Link } from '@mui/material';
import React from 'react';

const Error = ({ error }) => {
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
			{error && (
				<Typography component="h5" variant="h5">
					{error.message}
				</Typography>
			)}
			<Button variant="contained" color="success">
				<Link href="/" color="#fff" underline="none">
					Go back to Home
				</Link>
			</Button>
		</Box>
	);
};

export default Error;
