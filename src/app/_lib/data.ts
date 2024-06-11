export interface HourlyForecast {
	time: string;
	temp_c: number;
	temp_f: number;
	condition: {
		text: string;
		icon: string;
	};
	wind_mph: number;
	wind_kph: number;
	wind_degree: number;
	wind_dir: string;
	pressure_mb: number;
	pressure_in: number;
	humidity: number;
	cloud: number;
	feelslike_c: number;
	feelslike_f: number;
	dewpoint_c: number;
	dewpoint_f: number;
	gust_kph: number;
	gust_mph: number;
	vis_km: number;
	vis_miles: number;
	will_it_rain: number;
	chance_of_rain: number;
	air_quality: {
		co: number;
		no2: number;
		o3: number;
		so2: number;
		pm2_5: number;
		pm10: number;
	};
}

export interface DailyForecast {
	date: string;
	hour: HourlyForecast[];
	time: string;
}

export interface WeatherData {
	location: {
		name: string;
	};
	forecast: {
		forecastday: DailyForecast[];
	};
}

export async function fetchWeatherData(query: string): Promise<WeatherData> {
	const weatherApiKey = process.env.WEATHER_API;

	if (!weatherApiKey) {
		throw new Error('Missing API key');
	}

	const response = await fetch(
		`http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${query}&days=5&aqi=no&alerts=no`,
		{ cache: 'no-store' }
	);

	if (!response.ok) {
		throw new Error('Failed to fetch weather data | No city found');
	}

	const data = await response.json();
	return data;
}

//fetch weather by date and location

export async function fetchWeatherDataForDateAndLocation(
	location: string,
	date: string
): Promise<DailyForecast | undefined> {
	const weatherApiKey = process.env.WEATHER_API;

	if (!weatherApiKey) {
		throw new Error('Missing API key');
	}

	const response = await fetch(
		`http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=5&aqi=yes&alerts=no`,
		{ cache: 'no-store' }
	);

	if (!response.ok) {
		throw new Error('Failed to fetch weather data');
	}

	const data = await response.json();
	const dayData = data.forecast.forecastday.find((day: DailyForecast) => day.date === date);

	return dayData;
}
