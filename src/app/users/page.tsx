import { Box, Card, Grid, Paper, Stack, Typography, Link as LinkMui, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
	title: 'Users',
};

interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
	};
	phone: string;
	website: string;
}

const ImageLink = 'https://picsum.photos/seed/picsum/400/400';

const Users = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const users = await response.json();

	return (
		<Grid container spacing={2} marginTop={8}>
			{users.map((user: User) => (
				<Grid
					item
					xs={12}
					md={6}
					xl={4}
					key={user.id}
					display="flex"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					marginBottom={3}
				>
					<Typography variant="body1" sx={{ marginBottom: 1 }}>
						{user.name}
					</Typography>
					<Image src={ImageLink} alt="image" width="400" height="400" />
					<Stack display="flex" flexDirection="row" alignItems="center" gap={5}>
						<Typography variant="body1" color="primary">
							Email: {user.email}
						</Typography>
						<Typography variant="body2" color="secondary">
							City: {user.address.city}
						</Typography>
					</Stack>
					<Link href={`/users/${user.id}`}>
						<Button variant="contained">See More</Button>
					</Link>
				</Grid>
			))}
		</Grid>
	);
};

export default Users;
