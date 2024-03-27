import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { OpenSkyApi } from 'opensky-api';

export default function App() {
	const [data, setData] = useState([]);
	const fetchData = async () => {
		console.log('called');
		const api = new OpenSkyApi();
		try {
			const { states } = await api.getFlightsByArrivalAirport(
				'DNMM',
				1711535193,
				1711535764
			);
			// setData(states);
			console.log(states);
		} catch (e) {
			console.log('Error fetching data', e);
		}
	};

	useEffect(() => {
		fetchData();
	});

	return (
		<View style={styles.container}>
			<Text>Open up App.js to working on your nam</Text>
			<StatusBar style='auto' />
		</View>
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
