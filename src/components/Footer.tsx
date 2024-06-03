import { BottomNavigation, Box, Divider, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<Box
			width="100%"
			padding={2}
			display="flex"
			justifyContent="center"
			alignItems="center"
			sx={{ backgroundColor: '#191818f8' }}
		>
			<Divider />
			<Typography color="#f4f4f4">
				Copyright &copy; <strong>BombMarley {currentYear}</strong>. All rights reserved
			</Typography>
		</Box>
	);
};

export default Footer;
