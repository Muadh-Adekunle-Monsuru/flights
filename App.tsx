import React from 'react';
import { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import BigCard from './bigcard';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { callApi } from './timelogic';
import tw from 'twrnc';

export default function App() {
	const [flights, setFlights] = useState([]);
	useEffect(() => {
		callApi(setFlights);
	}, []);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<Text style={tw`font-bold text-3xl pt-5`}>Flights This Hour</Text>
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
