import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { size, width } from "../../utils/size";
import { WIDTH_DESCRIPTION_BLOCK } from "../../screens/resume";
interface ResumeBlockProps {
	title: string
	description: React.ReactNode
}
export const ResumeBlock = ({ title, description }: ResumeBlockProps) => {
	return (
		<View style={styles.wrap}>
			<View style={styles.resumWrap}>
				<Text style={styles.title}>{title}</Text>
				<View style={styles.resumDescription}>
					{description}
				</View>
			</View>
			<View style={styles.designModel} />
		</View>
	)
}

const styles = StyleSheet.create({
	resumWrap: { flexDirection: "row",  width: width - size(32) },
	wrap: {
		width: width - size(32)
	},
	title: {
		fontSize: size(18),
		fontStyle: 'italic',
		width: size(100),
		marginRight: size(15)
	},
	resumDescription: { justifyContent: "flex-start", width: WIDTH_DESCRIPTION_BLOCK },
	designModel: {
		height: size(1),
		width: "100%",
		backgroundColor: "grey",
		marginVertical: size(15)
	},
})
