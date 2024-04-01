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

		// Get the number of calls made today from AsyncStorage
		const numCallsToday = await AsyncStorage.getItem('numCallsToday');

		// If last call time exists and it's today, don't make the call
		if (lastCallTime && isToday(currentTime, new Date(lastCallTime))) {
			Alert.alert('API already called today');
			console.log('API already called today');
			return;
		}

		// If numCallsToday exceeds 3, don't make the call
		if (numCallsToday && parseInt(numCallsToday) >= 3) {
			Alert.alert('API call limit reached for today');
			console.log('API call limit reached for today');
			return;
		}

		// Determine the time slot
		const timeSlot = getTimeSlot(currentTime);

		// Make API call based on time slot
		switch (timeSlot) {
			case 'morning':
				await makeApiCall(db, setFlights);
				break;
			case 'afternoon':
				// Check if morning API call was made
				if (!lastCallTime || !isToday(currentTime, new Date(lastCallTime))) {
					await makeApiCall(db, setFlights);
				}
				break;
			case 'night':
				// Check if morning and afternoon API calls were made
				if (
					(!lastCallTime || !isToday(currentTime, new Date(lastCallTime))) &&
					parseInt(numCallsToday) < 2
				) {
					await makeApiCall(db, setFlights);
				}
				break;
			default:
				console.log('Invalid time slot');
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
		console.log(jsonData);
		fetchData(db, setFlights);
	}

	// Store the current time as the last call time
	await AsyncStorage.setItem('lastCallTime', new Date().toISOString());

	// Increment the number of calls made today
	let numCallsTodayString = await AsyncStorage.getItem('numCallsToday');
	let numCallsToday: number;
	if (numCallsTodayString) {
		numCallsToday = parseInt(numCallsTodayString) + 1;
	} else {
		numCallsToday = 1;
	}
	await AsyncStorage.setItem('numCallsToday', numCallsToday.toString());
	console.log('API call successful');
	Alert.alert('Api call successful');
};

const getTimeSlot = (time) => {
	const hours = time.getHours();
	if (hours >= 6 && hours < 12) {
		return 'morning';
	} else if (hours >= 12 && hours < 18) {
		return 'afternoon';
	} else {
		return 'night';
	}
};

const isToday = (date1, date2) => {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};

// Call the API function when the app is loaded or when needed
