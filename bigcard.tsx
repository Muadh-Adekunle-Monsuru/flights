import React from 'react';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';
export default function BigCard(props) {
	const { flight, index } = props;
	if (flight.flight_status == 'active') {
	}
	const statusColor =
		flight.flight_status == 'active' ? 'bg-green-100 font-bold' : 'bg-gray-200';
	return (
		<View style={styles.card} key={index}>
			<View style={styles.topRow}>
				<Text style={tw` font-bold text-xl`}>{flight.airline_name}</Text>
				<Text>{flight.flight_iata}</Text>
				<Text style={tw` rounded-xl py-1 px-3 ${statusColor}`}>
					{flight.flight_status}
				</Text>
			</View>

			<View style={tw` py-3 w-full flex-row `}>
				<View style={tw`basis-1/3 justify-center`}>
					<Text style={tw`font-bold text-5xl`}>{flight.departure_iata}</Text>
					<Text style={tw`text-gray-500`}>{flight.departure_airport}</Text>
					<Text style={tw`text-gray-500 `}>{flight.departure_time}</Text>
				</View>
				<View style={tw`justify-center basis-1/3 `}>
					<Text style={tw`text-center flex-row justify-between items-center`}>
						<Ionicons name='airplane' size={45} color='black' />
					</Text>
				</View>
				<View style={tw` basis-1/3 `}>
					<Text style={tw`font-bold text-5xl text-right`}>LOS</Text>
					<Text style={tw` text-right text-gray-500`}>
						{flight.arrival_airport}
					</Text>
					<Text style={tw` text-right text-gray-500 `}>
						{flight.arrival_estimated}
					</Text>
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
		borderWidth: 1,
		borderColor: 'black',
		width: '95%',
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
	topRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 6,
		justifyContent: 'space-between',
		fontSize: 15,
		borderBottomWidth: 1,
		borderBottomColor: 'gray',
		borderStyle: 'dashed',
		paddingBottom: 10,
	},
	label: {
		fontWeight: 'bold',
		marginRight: 6,
	},
});
