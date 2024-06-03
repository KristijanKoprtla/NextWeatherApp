import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Box, ThemeProvider } from '@mui/material';
import { rootTheme } from '@/themes/rootThemes';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
	title: {
		template: '%s | WeatherApp',
		default: 'Welcome | WeatherApp',
	},
	description: 'Simple Weather App',
};

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<html lang="en">
		<body>
			<AppRouterCacheProvider>
				<ThemeProvider theme={rootTheme}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							minHeight: '100vh',
						}}
					>
						<Navbar />
						<Box component="main" sx={{ flexGrow: 1 }}>
							{children}
						</Box>
						<Footer />
					</Box>
				</ThemeProvider>
			</AppRouterCacheProvider>
		</body>
	</html>
);

export default RootLayout;
