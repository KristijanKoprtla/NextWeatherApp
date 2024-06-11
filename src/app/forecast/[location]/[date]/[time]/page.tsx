import BasicModal from '@/components/BasicModal';

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import { fetchWeatherDataForDateAndLocation, DailyForecast, HourlyForecast, WeatherData } from '@/app/_lib/data';
import Custom404 from '@/app/not-found';

interface ForecastDetailProps {
	params: {
		date: string;
		location: string;
		time: string;
	};
}

export async function generateMetadata({ params }: ForecastDetailProps) {
	const { date, location, time } = params; // Include time in metadata
	const formattedLocation = decodeURIComponent(location)
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
	return {
		title: `${formattedLocation} ${date} ${decodeURIComponent(time)} | Details | WeatherApp`,
		description: `Weather forecast for ${formattedLocation} on ${date} at ${time}`,
	};
}

export default async function Details({ params }: ForecastDetailProps) {
	const { location, date, time } = params;

	const decodedTime = decodeURIComponent(time);

	const dayData: DailyForecast | undefined = await fetchWeatherDataForDateAndLocation(location, date);

	if (!dayData) {
		return <Custom404 />;
	}

	// Find the specific forecast for the given time
	const hourlyForecast = dayData.hour.find((forecast) => forecast.time.split(' ')[1] === decodedTime);

	if (!hourlyForecast) {
		return <Custom404 />;
	}

	console.log(hourlyForecast);

	return (
		<Box marginTop={10}>
			<Typography variant="h4" component="h4" paddingTop={2} sx={{ textAlign: 'center', margin: '0 auto' }}>
				Detalji vremena za {location} {date} u {decodedTime}
			</Typography>
			<Box mb={2} p={2} border="1px solid #cccccc3a" borderRadius={4}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Typography variant="h6">Temperatura</Typography>
						<Typography variant="body2">
							Temperatura: {hourlyForecast.temp_c} °C / {hourlyForecast.temp_f} °F
						</Typography>
						<Typography variant="body2">
							Osjećaj: {hourlyForecast.feelslike_c} °C / {hourlyForecast.feelslike_f} °F
						</Typography>
						<Typography variant="body2">
							Rosna točka: {hourlyForecast.dewpoint_c} °C / {hourlyForecast.dewpoint_f} °F
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="h6">Uvjeti</Typography>
						<Typography variant="body2">Uvjeti: {hourlyForecast.condition.text}</Typography>
						<Image src={`https:${hourlyForecast.condition.icon}`} alt="Weather icon" width={50} height={50} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="h6">Vjetar</Typography>
						<Typography variant="body2">
							Brzina vjetra: {hourlyForecast.wind_kph} kph / {hourlyForecast.wind_mph} mph
						</Typography>
						<Typography variant="body2">
							Smjer vjetra: {hourlyForecast.wind_dir} ({hourlyForecast.wind_degree}°)
						</Typography>
						<Typography variant="body2">
							Najveći udar: {hourlyForecast.gust_kph} kph / {hourlyForecast.gust_mph} mph
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="h6">Ostali podaci</Typography>
						<Typography variant="body2">
							Pritisak: {hourlyForecast.pressure_mb} mb / {hourlyForecast.pressure_in} in
						</Typography>
						<Typography variant="body2">Vlažnost: {hourlyForecast.humidity}%</Typography>
						<Typography variant="body2">Oblačnost: {hourlyForecast.cloud}%</Typography>
						<Typography variant="body2">
							Vidljivost: {hourlyForecast.vis_km} km / {hourlyForecast.vis_miles} miles
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h6">Kvaliteta zraka</Typography>
						<Typography variant="body2">CO: {hourlyForecast.air_quality.co}</Typography>
						<Typography variant="body2">NO2: {hourlyForecast.air_quality.no2}</Typography>
						<Typography variant="body2">O3: {hourlyForecast.air_quality.o3}</Typography>
						<Typography variant="body2">SO2: {hourlyForecast.air_quality.so2}</Typography>
						<Typography variant="body2">PM2.5: {hourlyForecast.air_quality.pm2_5}</Typography>
						<Typography variant="body2">PM10: {hourlyForecast.air_quality.pm10}</Typography>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
