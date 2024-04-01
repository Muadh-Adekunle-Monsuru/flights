import { Alert } from 'react-native';
export async function fetchFlightData() {
	const accessKey = '24e40b49d0f65b22757c2e3ae32df4cb';
	const arrIATA = 'LOS'; // Destination airport code (Lagos)
	const apiUrl = `http://api.aviationstack.com/v1/flights?access_key=${accessKey}&arr_iata=${arrIATA}`;

	Alert.alert('Fetching Data');
	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error('Failed to fetch data');
			Alert.alert('Failed to fetch data');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching flight data:', error);
		Alert.alert('Error Fetching Data');
		throw error;
	}
}
