import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
export default function BigCard(props) {
	const { flight, index } = props;
	return (
		<View style={styles.card} key={index}>
			<View style={styles.row}>
				<View style={styles.row}>
					<Text style={styles.label}>Airline Name:</Text>
					<Text>{flight.airline_name}</Text>
				</View>

				<View style={styles.row}>
					<Text style={styles.label}>Flight IATA:</Text>
					<Text>{flight.flight_iata}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Status:</Text>
					<Text>{flight.flight_status}</Text>
				</View>
			</View>

			<View style={styles.row}>
				<View style={styles.row}>
					<Text style={styles.label}>Departure IATA:</Text>
					<Text>{flight.departure_iata}</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={styles.row}>
					<Text style={styles.label}>Departure Airport:</Text>
					<Text>{flight.departure_airport}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Arrival Airport:</Text>
					<Text>{flight.arrival_airport}</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={styles.row}>
					<Text style={styles.label}>Departure Time:</Text>
					<Text>{flight.departure_time}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Arrival Estimated:</Text>
					<Text>{flight.arrival_estimated}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 16,
		marginVertical: 18,
		elevation: 4,
		borderWidth: 2,
		borderColor: 'black',
		width: '90%',
		alignSelf: 'center',
	},
	heading: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 6,
		justifyContent: 'space-between',
		fontSize: 15,
	},
	label: {
		fontWeight: 'bold',
		marginRight: 6,
	},
});
