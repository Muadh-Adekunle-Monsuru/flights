import { Alert } from 'react-native';
import axios from 'axios';

export async function fetchFlightData() {
	const accessKey = '24e40b49d0f65b22757c2e3ae32df4cb';
	const arrIATA = 'LOS'; // Destination airport code (Lagos)
	const apiUrl = `http://api.aviationstack.com/v1/flights?access_key=${accessKey}&arr_iata=${arrIATA}`;

	Alert.alert('Fetching Data');
	try {
		const response = await axios.get(apiUrl);
		const data = response.data;
		return data;
	} catch (error) {
		console.error('Error fetching flight data:', error);
		Alert.alert('Error Fetching Data');
	}
}
