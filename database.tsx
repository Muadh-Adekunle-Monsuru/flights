import * as SQLite from 'expo-sqlite';
import { StyleSheet, Platform, Text, View } from 'react-native';
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

	const db = SQLite.openDatabase('db3.db');
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
		console.log('inserting into table');
		tx.executeSql(
			'insert into arrivals (flight_status, flight_iata,airline_name,departure_airport,departure_iata,arrival_airport,arrival_iata,arrival_estimated,departure_time) values (?,?,?,?,?,?,?,?,?)',
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
				console.log('successful inserted record');
			},
			(_, error) => {
				console.error('Error inserting records:', error);
				return false;
			}
		);
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

export const fetchData = async (db, setFlights) => {
	await db.transaction((tx) => {
		tx.executeSql(`select * from arrivals;`, [], (_, { rows: { _array } }) => {
			setFlights(_array);
		});
	});
};
