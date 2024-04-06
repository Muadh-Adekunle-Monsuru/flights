import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchFlightData } from './apicall';
import { add, deleteAll, createTable, fetchData } from './database';
import { Alert } from 'react-native';
export const callApi = async (db, setFlights) => {
	try {
		// Get the current time
		const currentTime = new Date();

		// Get the last call time from AsyncStorage
		const lastCallTime = await AsyncStorage.getItem('lastCallTime');

		if (lastCallTime && isToday(currentTime, new Date(lastCallTime))) {
			Alert.alert('API already called today');
			console.log('API already called today');
			fetchData(db, setFlights);
			return;
		} else {
			await makeApiCall(db, setFlights);
		}
	} catch (error) {
		console.error('Error calling API:', error);
		Alert.alert('Error calling API:', error);
	}
};

const makeApiCall = async (db, setFlights) => {
	// Call your API to fetch data
	const jsonData = await fetchFlightData();

	if (jsonData) {
		createTable(db);
		deleteAll(db);
		add(jsonData, db);
		// console.log(jsonData);
		fetchData(db, setFlights);
	}
	// Store the current time as the last call time
	await AsyncStorage.setItem('lastCallTime', new Date().toISOString());
	console.log('API call successful');
	Alert.alert('Api call successful');
};

const isToday = (date1, date2) => {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};
