import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home";
import { ResumeScreen } from "../screens/resume";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type NavigatorParamList = {
	Home: undefined;
	ResumePage: undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

export const AppStack = () => {
	const [existSession, setExistSession] = useState<boolean | null>()
	const checkExistSession = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('userLogin')
			setExistSession(Boolean(jsonValue))
		} catch(e) {
		}
	}
	useEffect(() => {
		checkExistSession()
	}, [existSession])

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={"Home"}
			>
				<Stack.Screen options={{ orientation: 'portrait', headerShown: false }} name={"ResumePage"} component={ResumeScreen}/>
				<Stack.Screen options={{ orientation: 'portrait', headerShown: false }} name={"Home"} component={HomeScreen}/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
