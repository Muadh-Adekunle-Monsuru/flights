import { useState, useEffect } from 'react';
import { Platform, Text, View, ScrollView, StyleSheet } from 'react-native';
import BigCard from './bigcard';
import { openDatabase, createTable, add, fetchData } from './database';
import { testData } from './testdata';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
	const [flights, setFlights] = useState([]);
	const db = openDatabase();
	useEffect(() => {
		createTable(db);
		add(testData, db);
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
