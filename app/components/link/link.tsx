import React, { useCallback } from "react";
import { Alert, Linking, Pressable } from "react-native";

interface LinkProps {
	children: React.ReactNode
	url: string
}

export const Link = ({ children, url }: LinkProps) => {
	const handlePress = useCallback(async () => {
		const supported = await Linking.canOpenURL(url);

		if (supported) {
			await Linking.openURL(url);
		} else {
			Alert.alert(`Don't know how to open this URL: ${url}`);
		}
	}, [url]);

	return (
		<Pressable onPress={handlePress} hitSlop={10}>
			{children}
		</Pressable>
	)
}
