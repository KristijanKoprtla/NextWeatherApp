'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material';

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});

export const rootTheme = createTheme({
	palette: {
		mode: 'light',
	},
	typography: {
		fontFamily: roboto.style.fontFamily,
	},
	components: {
		MuiDrawer: {
			styleOverrides: {
				paper: {
					height: '100vh',
					position: 'relative',
				},
			},
		},
		MuiListItem: {
			defaultProps: {
				disablePadding: true,
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					minWidth: '40px',
				},
			},
		},
	},
});
