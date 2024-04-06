import { supabase } from './supabase';
import { testData } from './testdata';
import { parseISO, startOfDay, endOfDay } from 'date-fns';

export const insertData = async (raw) => {
	try {
		raw.data.map(async (testData) => {
			const { error } = await supabase.from('flights').insert({
				flight_status: testData.flight_status,
				flight_iata: testData.flight.iata,
				airline_name: testData.airline.name,
				departure_airport: testData.departure.airport,
				departure_iata: testData.departure.iata,
				arrival_airport: testData.arrival.airport,
				arrival_iata: testData.arrival.iata,
				arrival_estimated: testData.arrival.estimated,
				departure_actual: testData.departure.actual,
			});
			if (error) {
				throw new Error(JSON.stringify(error));
			}
		});
		deleteRecordsNotCreatedToday();
	} catch (e) {
		console.log('Error Fetching Data', e);
	}
};
export const getData = async (setFlight) => {
	try {
		const currentTime = new Date(); // Get current time on user's device

		const oneHourLater = new Date(currentTime.getTime() + 60 * 60 * 1000); // Adding milliseconds for 1 hour

		const oneHourLaterISOString = oneHourLater
			.toISOString()
			.slice(0, currentTime.toString.length - 11);

		const { data, error } = await supabase
			.from('flights')
			.select()
			.like('arrival_estimated', `${oneHourLaterISOString}%`);

		if (error) {
			throw new Error(JSON.stringify(error));
		}
		// console.log(oneHourLaterISOString);
		setFlight(data);
	} catch (e) {
		console.error('Error retrieving data', e);
	}
};

export const deleteData = async () => {
	try {
		const { error } = await supabase.from('flights').delete();
		if (error) {
			throw new Error(JSON.stringify(error));
		}
	} catch (e) {
		console.log('error deleting data', e);
	}
};
// export const deleteRecordsCreatedToday = async () => {
// 	try {
// 		const currentTime = new Date(); // Current time on user's device
// 		const startOfToday = startOfDay(currentTime); // Start of today
// 		const endOfToday = endOfDay(currentTime); // End of today

// 		// Convert to ISO format
// 		const startOfTodayISO = startOfToday.toISOString();
// 		const endOfTodayISO = endOfToday.toISOString();

// 		// Delete records created between start and end of today
// 		const { error } = await supabase
// 			.from('flights')
// 			.delete()
// 			.lt('created_at', endOfTodayISO)
// 			.gt('created_at', startOfTodayISO);

// 		if (error) {
// 			throw new Error(JSON.stringify(error));
// 		}

// 		console.log('Records created today have been deleted.');
// 	} catch (e) {
// 		console.error('Error deleting records created today:', e);
// 	}
// };

export const deleteRecordsNotCreatedToday = async () => {
	try {
		const currentTime = new Date(); // Current time on user's device
		const startOfToday = startOfDay(currentTime); // Start of today
		const endOfToday = endOfDay(currentTime); // End of today

		// Convert to ISO format
		const startOfTodayISO = startOfToday.toISOString();
		const endOfTodayISO = endOfToday.toISOString();

		// Delete records not created today
		const { error } = await supabase
			.from('your_table_name')
			.delete()
			.not('created_at', '>=', startOfTodayISO)
			.not('created_at', '<=', endOfTodayISO);

		if (error) {
			throw new Error(JSON.stringify(error));
		}

		console.log('Records not created today have been deleted.');
	} catch (e) {
		console.error('Error deleting records not created today:', e);
	}
};
