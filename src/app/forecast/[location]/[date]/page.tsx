import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import { fetchWeatherDataForDateAndLocation, DailyForecast } from '@/app/_lib/data';
import Custom404 from '@/app/not-found';
import Link from 'next/link';

interface ForecastDetailProps {
	params: {
		date: string;
		location: string;
	};
}

export async function generateMetadata({ params }: ForecastDetailProps) {
	const { date, location } = params;
	const formattedLocation = decodeURIComponent(location)
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
	return {
		title: `${formattedLocation} ${date} | WeatherApp`,
		description: `Weather forecast for ${formattedLocation} on ${date}`,
	};
}

export default async function ForecastDetail({ params }: ForecastDetailProps) {
	const { location, date } = params;

	const dayData: DailyForecast | undefined = await fetchWeatherDataForDateAndLocation(location, date);

	if (!dayData) {
		return <Custom404 />;
	}

	/* if (!location) {
		return <h1>No city found</h1>;
	} */

	return (
		<Box marginTop={10}>
			<Typography variant="h4">Detalji vremena za {date}</Typography>
			<Grid container spacing={2}>
				{dayData?.hour.map((hourlyForecast, index) => (
					<Grid item key={index} xs={12} sm={6} lg={4}>
						<Link
							key={index}
							href={`/forecast/${encodeURIComponent(location)}/${date}/${hourlyForecast.time.split(' ')[1]}`}
							passHref
						>
							<Stack
								spacing={2}
								direction="column"
								sx={{
									padding: 2,
									marginBottom: 2,
									border: '1px solid #f3f3f3',
									borderRadius: 10,
									backgroundImage:
										hourlyForecast.will_it_rain == 1
											? 'linear-gradient(rgba(0,0,0,0.5), rgba(0, 0, 0, 0.749)), url(https://images.pexels.com/photos/2259232/pexels-photo-2259232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
											: 'linear-gradient(rgba(0, 0, 0, 0.365), rgba(0, 0, 0, 0.324)), url(https://ktar.com/wp-content/uploads/2019/02/phoenix-weather.jpg)',
									/* backgroundImage:
									hourlyForecast.will_it_rain == 1
										? `url('https://images.pexels.com/photos/2259232/pexels-photo-2259232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
										: `url('https://ktar.com/wp-content/uploads/2019/02/phoenix-weather.jpg')`, */

									backgroundSize: 'cover',
									backgroundPosition: 'center',
									color: '#f4f4f4',
								}}
							>
								<Stack display="flex" flexDirection="row" justifyContent="space-between">
									<Typography variant="body2">{date}</Typography>
									<Typography variant="h6">{hourlyForecast.time.split(' ')[1]}</Typography>
								</Stack>
								<Typography>
									{hourlyForecast.time.split(' ')[1]}: {hourlyForecast.temp_c} °C
								</Typography>
								<Typography>
									{hourlyForecast.condition.text}{' '}
									<Image src={`https:${hourlyForecast.condition.icon}`} alt="Weather icon" width={25} height={25} />
								</Typography>
							</Stack>
						</Link>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
