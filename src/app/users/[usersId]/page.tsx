import { Box, Typography } from '@mui/material';
import React from 'react';

export default async function Page({ params }: { params: { usersId: string } }) {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const users = await response.json();

	const userId = parseInt(params.usersId);
	const user = users.find((user: { id: number }) => user.id === userId);

	return (
		<Box margin={10}>
			<Typography>User: {params.usersId}</Typography>

			{user ? (
				<>
					<Typography>User name is: {user.name}</Typography>
					<Typography>User email is: {user.email}</Typography>
				</>
			) : (
				<Typography>User not found</Typography>
			)}
		</Box>
	);
}
