import { Icon, Text, View } from "@/components/themed"
import { usePlantActions, usePlants } from '@/core/hooks/use-plant-store'
import { useSearchActions, useSearchText } from "@/core/hooks/use_search_store"
import { formatDistanceToNowStrict } from "date-fns"
import { Link } from "expo-router"
import { FlatList, Pressable, TextInput } from "react-native"

function formatDate(date: string) {
	return `${formatDistanceToNowStrict(date)} ago`
}

export default function Plants() {
	const plants = usePlants()
	const searchText = useSearchText()
	const { refetch } = usePlantActions()
	const { onChangeSearchText } = useSearchActions()

	const filteredPlants = plants.filter(
		(plant) =>
			plant.type?.toLowerCase().includes(searchText.toLowerCase()) ||
			plant.description?.toLowerCase().includes(searchText.toLowerCase()),
	)

	const HeaderContainer = (
		<View className="m-4 gap-y-4 flex-row justify-between">
			<View className="w-fit flex-row justify-items-start">
				<Text className="pr-2 text-xl">Search</Text>
				<TextInput
					defaultValue=""
					value={searchText}
					onChangeText={(text) => onChangeSearchText(text)}
					placeholder="_____________________"
					className="w-20 text-xl underline decoration-solid"
				/>
			</View>
			<Link
				asChild
				href={{
					pathname: "/edit/editplant"
				}}
			>
				<Pressable className="active:opacity-50">
					<Icon
						name="plus-circle"
						className="text-3xl text-blue-600 dark:text-blue-400"
					/>
				</Pressable>
			</Link>
		</View>
	)

	// empty list
	if (plants.length === 0)
		return (
			<>
				{HeaderContainer}
				<View className="flex-1 items-center justify-center">
					<Text className="animate-spin p-4 text-8xl">⓿</Text>
					<Text>Nothing yet</Text>
				</View>
			</>
		)

	return (
		<>
			{HeaderContainer}
			<FlatList
				numColumns={2}
				data={filteredPlants}
				refreshing={false}
				onRefresh={refetch}
				keyExtractor={(plant) => String(plant.id)}
				contentInsetAdjustmentBehavior="automatic"
				renderItem={({ item: plant }) => (
					<Link
						asChild
						href={{
							pathname: "/edit/editplant",
							params: { id: plant.id },
						}}
					>
						<Pressable className="flex-1 gap-y-2 rounded border border-black/75 p-4 dark:border-white/75">
							<Text className="line-clamp-1 text-2xl font-medium">{plant.type}</Text>
							<Text className="line-clamp-4 flex-1">{plant.description}</Text>
							<Text className="line-clamp-4 flex-1">{plant.watering_program}</Text>
							<Text className="line-clamp-4 flex-1">{plant.sensor}</Text>
							<Text className="line-clamp-1 text-sm text-black/75 dark:text-white/75">
								{plant.updatedAt
									? `Edited: ${formatDate(plant.updatedAt)}`
									: formatDate(plant.createdAt)}
							</Text>
						</Pressable>
					</Link>
				)}
				contentContainerStyle={{ gap: 8, padding: 8 }}
				columnWrapperStyle={{ gap: 8 }}
			/>
		</>
	)
}
