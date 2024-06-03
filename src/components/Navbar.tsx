'use client';

import React, { useState } from 'react';
import {
	AppBar,
	Avatar,
	IconButton,
	Stack,
	Toolbar,
	Typography,
	Button,
	Hidden,
	Drawer,
	List,
	ListItem,
	ListItemText,
	Link as LinkMui,
} from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { usePathname } from 'next/navigation';
import iconLogo from '@/app/icon.ico';
import Image from 'next/image';

const Navbar = () => {
	const [openDrawer, setOpenDrawer] = useState(false);
	const currentPath = usePathname();

	const toggleDrawer = () => {
		setOpenDrawer(!openDrawer);
	};

	const closeDrawer = () => {
		setOpenDrawer(false);
	};

	return (
		<AppBar position="fixed" sx={{ backgroundColor: '#191818f8' }}>
			<Toolbar sx={{ marginX: 4 }}>
				<Link href="/">
					<IconButton size="large" edge="start" color="inherit" aria-label="logo">
						<Avatar>
							<Image src={iconLogo} alt="logo" width={50} height={50} />
						</Avatar>
					</IconButton>
				</Link>

				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					WeatherApp
				</Typography>

				{/* Show the hamburger menu on tablet screens */}
				<Hidden smUp>
					<IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer}>
						<MenuIcon />
					</IconButton>
				</Hidden>

				<Stack direction="row" spacing={2} gap={3}>
					<Hidden smDown>
						<Link href="/">
							{currentPath === '/' ? (
								<LinkMui component="button" color="green" variant="h6" underline="hover">
									Home
								</LinkMui>
							) : (
								<LinkMui component="button" color="inherit" variant="h6" underline="hover">
									Home
								</LinkMui>
							)}
						</Link>

						<Link href="/about">
							{currentPath === '/about' ? (
								<LinkMui component="button" color="green" variant="h6" underline="hover">
									About
								</LinkMui>
							) : (
								<LinkMui component="button" color="inherit" variant="h6" underline="hover">
									About
								</LinkMui>
							)}
						</Link>
						<Link href="/users">
							{currentPath === '/users' ? (
								<LinkMui component="button" color="green" variant="h6" underline="hover">
									Users
								</LinkMui>
							) : (
								<LinkMui component="button" color="inherit" variant="h6" underline="hover">
									Users
								</LinkMui>
							)}
						</Link>
					</Hidden>
				</Stack>
			</Toolbar>

			{/* Drawer for the hamburger menu */}
			<Drawer anchor="right" open={openDrawer} onClose={closeDrawer}>
				<Stack
					display="flex"
					flexDirection="row"
					justifyContent="space-between"
					alignItems="flex-start"
					paddingRight={5.3}
					paddingTop={2}
					paddingLeft={3}
				>
					<List>
						<ListItem onClick={closeDrawer}>
							<Link href="/">
								{currentPath === '/' ? (
									<LinkMui component="button" color="green" variant="h6" underline="hover">
										Home
									</LinkMui>
								) : (
									<LinkMui component="button" color="inherit" variant="h6" underline="hover">
										Home
									</LinkMui>
								)}
							</Link>
						</ListItem>
						<ListItem onClick={closeDrawer}>
							<Link href="/about">
								{currentPath === '/about' ? (
									<LinkMui component="button" color="green" variant="h6" underline="hover">
										About
									</LinkMui>
								) : (
									<LinkMui component="button" color="inherit" variant="h6" underline="hover">
										About
									</LinkMui>
								)}
							</Link>
						</ListItem>
						<ListItem onClick={closeDrawer}>
							<Link href="/users">
								{currentPath === '/users' ? (
									<LinkMui component="button" color="green" variant="h6" underline="hover">
										Users
									</LinkMui>
								) : (
									<LinkMui component="button" color="inherit" variant="h6" underline="hover">
										Users
									</LinkMui>
								)}
							</Link>
						</ListItem>
					</List>

					<IconButton edge="end" color="primary" aria-label="menu" onClick={toggleDrawer}>
						<CloseIcon sx={{ height: 32, width: 32 }} />
					</IconButton>
				</Stack>
			</Drawer>
		</AppBar>
	);
};

export default Navbar;
