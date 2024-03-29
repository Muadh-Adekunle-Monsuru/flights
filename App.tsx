import { useState, useEffect } from 'react';
import { Platform, Text, View, ScrollView, StyleSheet } from 'react-native';
import BigCard from './bigcard';
import {
	openDatabase,
	createTable,
	add,
	fetchData,
	deleteAll,
} from './database';
import { rawData } from './rawdata';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { callApi } from './timelogic';
import { fetchFlightData } from './apicall';
import { testData } from './testdata';
import { format } from 'date-fns'; // Importing date-fns for date formatting

export default function App() {
	const [flights, setFlights] = useState([]);
	const [raw, setRaw] = useState({});
	const db = openDatabase();
	useEffect(() => {
		callApi(db);
		const fetch = async () => {
			fetchData(db, setFlights);
		};
		fetch();
		fetchData(db, setFlights);
	}, []);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<ScrollView style={{ width: '100%' }}>
					{flights.map((data, index) => (
						<BigCard flight={data} key={index} />
					))}
				</ScrollView>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
