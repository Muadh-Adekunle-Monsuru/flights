import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchFlightData } from './apicall';
import { Alert } from 'react-native';
import {
	insertData,
	getData,
	deleteRecordsNotCreatedToday,
} from './newDatabase';
export const callApi = async (setFlights) => {
	try {
		// deleteRecordsNotCreatedToday();
		// Get the current time
		const currentTime = new Date();

		// Get the last call time from AsyncStorage
		const lastCallTime = await AsyncStorage.getItem('prevCallTime');

		if (lastCallTime && isToday(currentTime, new Date(lastCallTime))) {
			// Alert.alert('API already called today');
			console.log('API already called today');
			getData(setFlights);
			return;
		} else {
			await makeApiCall(setFlights);
		}
	} catch (error) {
		console.error('Error calling API:', error);
		Alert.alert('Error calling API:', error);
	}
};

const makeApiCall = async (setFlights) => {
	// Call your API to fetch data
	const jsonData = await fetchFlightData();

	if (jsonData) {
		insertData(jsonData);
		getData(setFlights);
	}
	// Store the current time as the last call time
	await AsyncStorage.setItem('prevCallTime', new Date().toISOString());
	console.log('API call successful');
	// Alert.alert('Api call successful');
};

const isToday = (date1, date2) => {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};
