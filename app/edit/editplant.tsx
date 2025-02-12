import { TextInput, View } from "@/components/themed"
import {
    useEditPlant,
    useEditPlantActions,
    usePlants,
} from '@/core/hooks/use-plant-store'
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Platform, Pressable, Text } from "react-native"

export default function EditPlant() {
    const { id } = useLocalSearchParams<{ id: string }>() // hook from Router (to get call parameters)
    const { type, description, wateringProgram, sensor } = useEditPlant()
    const { onChangeType, onChangeDescription, onChangeWateringProgram, onChangeSensor, savePlant, deletePlant } = useEditPlantActions()
    const router = useRouter()
    const plants = usePlants()
    const plant = plants.find((plant) => plant.id === Number(id))
    const mainTitle: string = id ? "Edit plant" : "New plant";

    const isEditing = id !== undefined
    const isiOS = Platform.OS === "ios"
    const isAndroid = Platform.OS === "android"

    // console.log("EditPlant: plant:" + JSON.stringify(plant));
    // console.log("isEditing=" + isEditing + " isAndroid=" + isAndroid + " isiOS=" + isiOS);

    const DeleteButton = (
        <Pressable
            onPress={() => { id && deletePlant(id); router.back() }}
            className="active:opacity-50"
        >
            <Text className="text-lg font-medium text-red-600 dark:text-red-400">
                Delete
            </Text>
        </Pressable>
    )

    const SaveButton = (
        <View className="flex flex-row gap-x-8">
            <Pressable
                onPress={() => { savePlant(id); router.back() }}
                className="active:opacity-50"
            >
                <Text className="text-lg font-medium text-blue-600 dark:text-blue-400">Save</Text>
            </Pressable>
        </View>
    )

    return (
        <View className="m-4 gap-y-4">
            <Text className=" text-2xl font-medium">{mainTitle}</Text>
            <View className="h-10">
                {isEditing && isAndroid && DeleteButton}
                {SaveButton}
            </View>
            <TextInput
                defaultValue={plant?.type ?? ""}
                value={type}
                onChangeText={onChangeType}
                placeholder="Type"

            />
            <TextInput
                multiline
                defaultValue={plant?.description ?? ""}
                value={description}
                onChangeText={onChangeDescription}
                placeholder="Description"

            />
            <TextInput
                defaultValue={plant?.sensor ?? ""}
                value={sensor}
                onChangeText={onChangeSensor}
                placeholder="Sensor Number"

            />
            <TextInput
                multiline
                defaultValue={plant?.watering_program ?? ""}
                value={wateringProgram}
                onChangeText={onChangeWateringProgram}
                placeholder="Watering Program"

            />

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
    )
}
