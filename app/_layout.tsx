
import { db, getFiles, getAllPlants, initializeDb } from "@/db/client"
import { useLoadAssets } from '@/core/hooks/use-load-assets'

import "@/styles/global.css"
import {
	ThemeProvider,
} from "@react-navigation/native"
import { Stack } from "expo-router"

import React from "react"

import { useThemeConfig } from "@/core/use-theme-config"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import FlashMessage from "react-native-flash-message"
import { getLocales } from 'expo-localization';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router"

// Ensure that reloading on `/edit` keeps a back button present.
export const unstable_settings = {
	initialRouteName: "index",
}

export default function RootLayout() {
	console.log("-->> RootLayout <<-- ");

	const deviceLanguage = getLocales()[0].languageCode;
	console.log("deviceLanguage=" + deviceLanguage);


	// TODO: reload font without useMigrations for drizzle db
	// const { isLoaded } = useLoadAssets()
	// if (!isLoaded) return null
    initializeDb();
	getFiles();
	getAllPlants();
	return <RootLayoutNavigation />
}

function RootLayoutNavigation() {

	return (
		<Providers>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</Providers>
	);
}

function Providers({ children }: { children: React.ReactNode }) {
	const theme = useThemeConfig();
	return (
		<GestureHandlerRootView style={{ flex: 1 }} className={theme.dark ? `dark` : undefined}	>

			<ThemeProvider value={theme}>
				{children}
				<FlashMessage position="top" />
			</ThemeProvider>

		</GestureHandlerRootView>
	);
}

