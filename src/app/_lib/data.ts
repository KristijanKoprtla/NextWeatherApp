export interface HourlyForecast {
	time: string;
	temp_c: number;
	condition: {
		text: string;
		icon: string;
	};
	will_it_rain: number;
	chance_of_rain: number;
}

export interface DailyForecast {
	date: string;
	hour: HourlyForecast[];
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
		`http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${query}&days=5&aqi=no&alerts=no`
	);

	if (!response.ok) {
		throw new Error('Failed to fetch weather data');
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
		`http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=5&aqi=no&alerts=no`
	);

	if (!response.ok) {
		throw new Error('Failed to fetch weather data');
	}

	const data = await response.json();
	const dayData = data.forecast.forecastday.find((day: DailyForecast) => day.date === date);

	return dayData;
}
