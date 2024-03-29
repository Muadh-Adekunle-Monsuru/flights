import * as SQLite from 'expo-sqlite';
import { StyleSheet, Platform, Text, View } from 'react-native';
import { format } from 'date-fns'; // Importing date-fns for date formatting

export function openDatabase() {
	if (Platform.OS === 'web') {
		return {
			transaction: () => {
				return {
					executeSql: () => {},
				};
			},
		};
	}

	const db = SQLite.openDatabase('db4.db');
	return db;
}
export const createTable = (db) => {
	db.transaction((tx) => {
		console.log('creating table');
		tx.executeSql(
			'CREATE TABLE IF NOT EXISTS arrivals (id INTEGER PRIMARY KEY NOT NULL, flight_status TEXT, flight_iata TEXT, airline_name TEXT, departure_airport TEXT, departure_iata TEXT, arrival_airport TEXT, arrival_iata TEXT, arrival_estimated TEXT, departure_time TEXT);',
			[],
			(_, result) => {
				console.log('table created');
			}
		);
	});
};
export const add = (text, db) => {
	db.transaction((tx) => {
		text.data.map((text) => {
			tx.executeSql(
				'INSERT INTO arrivals (flight_status, flight_iata, airline_name, departure_airport, departure_iata, arrival_airport, arrival_iata, arrival_estimated, departure_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
				[
					text.flight_status,
					text.flight.iata,
					text.airline.name,
					text.departure.airport,
					text.departure.iata,
					text.arrival.airport,
					text.arrival.iata,
					text.arrival.estimated,
					text.departure.actual,
				],
				(_, result) => {
					if (result.rowsAffected > 0) {
						// console.log('Record inserted successfully');
					} else {
						// console.log('No rows affected');
					}
				},
				(_, error) => {
					console.error('Error inserting records:', error);
					return false; // Rollback transaction
				}
			);
		});
	});
};

export const deleteRecord = (text, db) => {
	db.transaction((tx) => {
		tx.executeSql(`delete from arrivals where id = ?;`, [text], (_, result) => {
			console.log('record deleted');
		});
	});
};
export const deleteAll = (db) => {
	db.transaction((tx) => {
		tx.executeSql(`delete from arrivals`, [], (_, result) => {
			console.log('All records deleted');
		});
	});
};

const getCurrentDateTime = () => {
	return format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx");
};

export const fetchData = async (db, setFlights) => {
	const currentTime = getCurrentDateTime();
	console.log(currentTime);
	await db.transaction((tx) => {
		tx.executeSql(
			`select * from arrivals where arrival_estimated > ? ORDER By arrival_estimated;`,
			[currentTime],
			(_, { rows: { _array } }) => {
				setFlights(_array);
			}
		);
	});
};
