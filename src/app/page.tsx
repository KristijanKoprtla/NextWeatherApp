import { Box, Grid, Paper, Typography } from '@mui/material';
import SearchCity from '@/components/SearchCity';
import Image from 'next/image';
import Link from 'next/link';

import { fetchWeatherData, WeatherData } from './_lib/data';

interface HomeProps {
	searchParams?: {
		query?: string;
		page?: string;
	};
}
export async function generateMetadata({ searchParams }: HomeProps) {
	const query = searchParams?.query || 'zagreb';
	const data: WeatherData = await fetchWeatherData(query);
	const formattedQuery = data.location.name
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
	return {
		title: `${formattedQuery} | WeatherApp`,
		description: `Get the latest weather forecast for ${formattedQuery}`,
	};
}

export default async function Home({ searchParams }: HomeProps) {
	const query = searchParams?.query || 'zagreb';
	const data: WeatherData = await fetchWeatherData(query);

	const currentDateTime = new Date();
	const targetTime = new Date(currentDateTime.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
	const targetHour = targetTime.getHours();
	const targetHourString = targetHour < 10 ? `0${targetHour}` : targetHour.toString();

	const today = new Date().toISOString().split('T')[0];

	// Extract forecast data for the next days at the calculated target time
	const forecast = data.forecast?.forecastday
		.filter((day) => day.date >= today)
		.map((day) => {
			const forecastAtTargetTime = day.hour.find((hour) => hour.time.includes(`${targetHourString}:00`));
			return {
				date: day.date,
				temp: forecastAtTargetTime?.temp_c,
				condition: forecastAtTargetTime?.condition.text,
				icon: `https:${forecastAtTargetTime?.condition.icon}`,
				will_it_rain: forecastAtTargetTime?.will_it_rain,
				chance_of_rain: forecastAtTargetTime?.chance_of_rain,
			};
		});

	/* forecast.forEach((item) => {
		console.log(item.chance_of_rain);
	}); */

	const isOddNumberOfItems = forecast?.length % 2 !== 0;

	return (
		<>
			<Box sx={{ position: 'absolute', top: '5rem', right: '5rem' }}>
				<SearchCity />
			</Box>
			<Box sx={{ flexGrow: 1, marginTop: '10rem', marginBottom: '2rem' }}>
				<Grid container spacing={4} justifyContent="center">
					{forecast.map((day, index: number) => (
						<Grid item key={index} xs={12} sm={isOddNumberOfItems && index === forecast.length - 1 ? 9 : 6} lg={4}>
							<Link href={`/forecast/${data.location.name}/${day.date}`}>
								<Paper
									elevation={6}
									sx={{
										padding: 5,
										minHeight: 120,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										backgroundImage:
											day.chance_of_rain && day.chance_of_rain > 35
												? 'linear-gradient(rgba(0, 0, 0, 0.344), rgba(0, 0, 0, 0.749)), url(https://images.pexels.com/photos/2259232/pexels-photo-2259232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
												: 'linear-gradient(rgba(78, 78, 78, 0.365), rgba(0, 0, 0, 0.134)), url(https://ktar.com/wp-content/uploads/2019/02/phoenix-weather.jpg)',
										color: '#ffffff',
									}}
								>
									<Typography>
										Temperatura u <strong>{data.location.name}</strong> za {day.date} u {targetHourString}:00 je:{' '}
										{day.temp} °C a vrijeme je <Image src={day.icon} alt="slikica" width={25} height={25} />{' '}
										{day.condition}.
									</Typography>
								</Paper>
							</Link>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
}
