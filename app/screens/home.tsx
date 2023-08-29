import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { fontSize, height, size, width } from "../utils/size";
import { Screen } from "../components/screen/screen";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HomeScreen = () => {
	const [username, setUsername] = useState<string>("");
	const [error, setError] = useState("");
	const navigation = useNavigation()
	const goToResumePage = async () => {
		try {
			const response = await fetch(
				`https://api.github.com/users/${username}`,
			);
			const json = await response.json();

			if(json.name) {
			  await AsyncStorage.setItem('userLogin', username)

				navigation.navigate("ResumePage", { user: json })
				setError("")
				setUsername("")
			} else {
				setError('User not exist')
				setTimeout(() => setError(""), 2000)
			}
		} catch (e) {
			console.log("err", e)
		}
	}

	return (
		<Screen>
			<View style={styles.root}>
				<View style={styles.wrap}>
					<Text style={styles.title}>Write your login</Text>
					<View>
						<TextInput
							style={[styles.inputBlock, { borderColor: error ? "red" : "grey" }]}
							onChangeText={setUsername}
							value={username}
							placeholder={"Write your login..."}
						/>
						{error && <Text style={styles.error}>{error}</Text>}
					</View>
					<Button disabled={!Boolean(username)} color="#841584" onPress={goToResumePage} title={"Sign In"} />
				</View>
			</View>
		</Screen>
	);
};

const styles = StyleSheet.create({
	root: { flex: 1,justifyContent: "center", alignItems: "center" , height },
	title: {
		fontSize: fontSize(18),
		fontWeight: "bold"
	},
	inputBlock: {
		borderRadius: size(8),
		borderWidth: size(1),
		paddingVertical: size(10),
		paddingHorizontal: size(15),
		color: "black",
		width: width - size(32),
		marginVertical: size(20),
	},
	buttonText: {},
	buttonBlock: {},
	wrap: { justifyContent: "center", width: width - size(32), alignItems: "center" },
	error: {
		color: "red",
		position: "absolute",
		bottom: -3
	}
})
