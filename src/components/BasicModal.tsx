'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '1px solid #d6e1d5',
	boxShadow: 24,
	p: 4,
	borderRadius: 2,
};

export default function BasicModal() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		console.log('client log');

		setOpen(true);
	};
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={handleOpen} sx={{ marginTop: 10 }}>
				Open modal
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Text in a modal
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}
