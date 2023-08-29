import React from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { size } from '../../utils/size';

const isIos = Platform.OS === 'ios';
interface ScreenProps {
	children?: React.ReactNode;
}

function ScreenWithScrolling(props: ScreenProps) {
	const insets = useSafeAreaInsets();

	return (
		<>
			<StatusBar barStyle={isIos ? 'dark-content' : 'light-content'} />
			<View style={[styles.outer, { backgroundColor: "white", paddingTop: insets.top }]}>
				<SafeAreaView style={styles.outer}>
					<ScrollView style={[styles.outer, styles.backgroundStyle]} contentContainerStyle={styles.inner}>
						{props.children}
					</ScrollView>
				</SafeAreaView>
			</View>
		</>
	);
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
	return <ScreenWithScrolling {...props} />
}

const styles = StyleSheet.create({
	outer: {
		flex: 1,
		height: '100%',
	},
	backgroundStyle: {
		backgroundColor: "white"
	},
	inner: {
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		// justifyContent: "center",
		// flex: 1,
		// height: '100%',
	}
})
