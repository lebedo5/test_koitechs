import React, { useEffect, useState } from "react"
import { Text, StyleSheet, View, Pressable } from "react-native"
import { Screen } from "../components/screen/screen"
import { useNavigation, useRoute } from "@react-navigation/native";
import { size, width } from "../utils/size";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetUserQuery } from "../store/apiSlice";
import { Link } from "../components/link/link";
import { ResumeBlock } from "../components/resume-block/resume-block";

export const WIDTH_DESCRIPTION_BLOCK = width - size(140)

export const ResumeScreen = () => {
	const { top } = useSafeAreaInsets()
	const { params: { login } } = useRoute()
	const [languages, setLanguages] = useState([])
	const [repository, setRepos] = useState([])
	const navigation = useNavigation()
	const { data } = useGetUserQuery(login);
	const calculatePercent = (val: number, reposLength: number) => {
		return ((val * 100) / reposLength).toFixed(0)
	}
	const checkLastUpdateRepo = (repos: object[]) => {
		const first5repo = repos.splice(0, 6);
		setRepos(first5repo)
	}

	const checkLanguages = (repos: object[]) => {
		const result: any = {}
		const finishResult: any = []

		if(repos.length) {
			for(let i = 0; i < repos.length; i++) {
				if(repos[i].language) {
					if(repos[i].language in result) {
						++result[repos[i].language]
					} else {
						result[repos[i].language] = 1
					}
				}
			}
		}

		for (const [key, value] of Object.entries(result)) {
			finishResult.push({
				lang: key,
				percent: calculatePercent(Number(value), repos.length)
			})
		}

		setLanguages(finishResult)
	}
	const fetchRepository = async () => {
		try {
			const response = await fetch(data.repos_url);
			const json = await response.json();
			checkLastUpdateRepo(json)
			checkLanguages(json)
		} catch (e) {
			console.log("error")
		}
	}

	useEffect(() => {
		fetchRepository()
	}, [data?.repos_url])

	const clearSession = async () => {
		try {
			await AsyncStorage.clear()
		} catch(e) {
		}
		navigation.navigate("Home")
	}

  return (
		<Screen>
			<View style={[styles.root, { paddingTop: top, paddingBottom: top }]}>
				<View style={styles.headerClearButton}>
					<Pressable style={styles.backButtonBlock} onPress={clearSession}>
						<Text style={styles.arrow}>←</Text>
					</Pressable>
					<Text style={styles.headerTitleScreen}>Resume Screen</Text>
				</View>
				<View style={styles.wrap}>
					<Text style={styles.username}>{data?.name}</Text>
					{data?.bio && <Text style={styles.bio}>{data?.bio}</Text>}
					{data?.created_at &&
						<Text style={styles.member}>Member from: {format(new Date(data?.created_at), "dd.MM.yyyy")}
						</Text>
					}
					<View style={styles.designModel} />
					<ResumeBlock
						title={"GitHub Profile"}
						description={
						<View>
							<Text style={styles.blockDescription}>{`On GitHub as an early adopter since 2007, ${data?.name} is a developer with `}<Text style={styles.linkWithoutUrl}>
								{`${data?.public_repos} public repositories `}</Text>
								and <Text style={styles.linkWithoutUrl}>{`${data?.followers} public repositories`}</Text>
							</Text>
						</View>}
					/>
					<ResumeBlock
						title={"Website"}
						description={<Link children={<Text style={styles.link}>{data?.blog}</Text>} url={data?.blog}/>}
					/>
					<ResumeBlock
						title={"Languages"}
						description={<View style={styles.languagesBlock}>
							{languages.map(({ lang, percent }) => {
								return (
									<View key={`language-${lang}`} style={styles.langsBlock}>
										<Text style={styles.languageTitle}>{lang}</Text>
										<Text style={styles.percent}>({percent}%)</Text>
									</View>
								)
							})}
						</View>}
					/>
					<ResumeBlock
						title={"Popular Repositories"}
						description={<View style={styles.descriptionRepos}>
							{repository.map(({ id, description, name, language, created_at, updated_at, html_url }) => {
								return (
									<View key={`repo-${id}`} style={styles.reposWrap}>
										<View>
											<Link children={<Text style={styles.repoTitle}>{name}</Text>} url={html_url} />
											<Text  style={{ fontSize: size(12) }}>{language} - Creator & Owner</Text>
										</View>
										<View style={styles.repoExistBlock}>
											<Text style={styles.repoExistTxt}>
												{format(new Date(created_at), 'yyyy')} - {format(new Date(created_at), 'yyyy') !== format(new Date(updated_at), 'yyyy') ? format(new Date(updated_at), 'yyyy') : null}
											</Text>

										</View>
										{description && <Text>{description}</Text>}
									</View>
								)
							})}
						</View>}
					/>
					<ResumeBlock
						title={"Organizations"}
						description={<Link children={<Text style={styles.link}>{data?.html_url}</Text>} url={data?.html_url} />}
					/>
					<ResumeBlock
						title={"About This Résumé"}
						description={<View>
							<Text>This résumé is generated automatically using public information from the developer's GitHub account. The repositories are ordered by popularity based on a very simple popularity heuristic that defines the popularity of a repository by its sum of watchers and forks. Do not hesitate to visit
								<Link children={<Text style={[styles.link, styles.separateText]}>{data?.name} GitHub page </Text>} url={data?.html_url} />
								for a complete work history.
							</Text>
					</View>}
					/>
				</View>
			</View>
		</Screen>
  )
}

const styles = StyleSheet.create({
	root: {
		justifyContent: "center", alignItems: "center",
	},
	wrap: {
		width: width - size(32),
	},
	username: {
		fontSize: size(24),
		fontWeight: "bold",
		letterSpacing: 1,
		paddingBottom: size(10)
	},
	bio: {
		paddingBottom: size(12)
	},
	designModel: {
		height: size(1),
		width: "100%",
		backgroundColor: "grey",
		marginVertical: size(15)
	},
	link: {
		color: "#a30a30",
		textDecorationLine: "underline",
		fontWeight: "bold",
		fontSize: size(14)
	},
	linkWithoutUrl: {
		color: "#a30a30",
		fontWeight: "bold",
		fontSize: size(14)
	},
	member: {},
	languageTitle: {
		fontWeight: "600",
		color: "#a30a30",
		fontSize: size(13),
		maxWidth: size(100)
	},
	languagesBlock: { flexWrap: "wrap", flexDirection: "row" },
	percent: { color: "black", fontSize: size(13) },
	blockDescription: {
		lineHeight: size(20),
		fontSize: size(16)
	},
	repositoryName: { fontSize: size(16), paddingBottom: size(4) },
	descriptionRepos: {flexWrap: "wrap", flexDirection: "row" },
	reposWrap: { paddingBottom: size(10) },
	repoTitle: {
		fontSize: size(18),
		paddingBottom: size(4),
		color: "#a30a30",
		textDecorationLine: "underline",
		fontWeight: "bold",
	},
	repoExistBlock: { marginVertical: size(10) },
	repoExistTxt: { fontSize: size(12)},
	headerClearButton: {
		height: size(48),
		borderBottomColor: "grey",
		borderBottomWidth: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: size(15)
	},
	backButtonBlock: { position: "absolute", left: size(16) },
	separateText: { position: "relative", top: 2 },
	langsBlock: { flexDirection: "row", width: WIDTH_DESCRIPTION_BLOCK / 2, paddingBottom: size(8) },
	arrow: { fontSize: size(22) },
	headerTitleScreen: { fontSize: size(16) }
})
