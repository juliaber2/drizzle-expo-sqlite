
import { TextInput, View } from "@/components/themed"
import {
	useEditNote,
	useEditNoteActions,
	useNotes,
} from '@/core/hooks/use-note-store';
import { Button } from "@/ui/button";
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Platform, Pressable, Text } from "react-native"

export default function EditNote() {
	const { id } = useLocalSearchParams<{ id: string }>()
	const { title, body } = useEditNote()
	const { onChangeTitle, onChangeBody, saveNote, deleteNote } = useEditNoteActions()
	const router = useRouter()
	const notes = useNotes()
	const note = notes.find((note) => note.id === Number(id))

	const isEditing = id !== undefined
	const isiOS = Platform.OS === "ios"
	const isAndroid = Platform.OS === "android"
	const mainTitle: string = id ? "Edit note" : "New note";

	console.log("EditNote: note:" + JSON.stringify(note));
	console.log("isEditing=" + isEditing + " isAndroid=" + isAndroid + " isiOS=" + isiOS + " mainTitle=" + mainTitle);

	const DeleteButton = (
		<Pressable
			onPress={() => {
				id && deleteNote(id)
				router.back()
			}}
			className="active:opacity-50"
		>
			<Text className="text-lg font-medium text-red-600 dark:text-red-400">Delete</Text>
		</Pressable>
	)

	const SaveButton = (
		<Pressable
			onPress={() => {
				saveNote(id)
				router.back()
			}}
			className="active:opacity-50"
		>
			<Text className="text-lg font-medium text-blue-600 dark:text-blue-400">Save</Text>
		</Pressable>
	)

	// to see buttons (or Pressable) we need to replace Stack.Screen by another items container with two buttons - Save and Delete
	return (
		<View className="m-4 gap-y-4">
			<Text className=" text-2xl font-medium">{mainTitle}</Text>
			<View className="h-10 flex-row w-full justify-between">
				{isEditing && isAndroid && DeleteButton}
				{SaveButton}
			</View>
			<TextInput
				defaultValue={note?.title ?? ""}
				value={title}
				onChangeText={onChangeTitle}
				placeholder="Title"
				className="text-2xl font-semibold"
			/>
			<TextInput
				multiline
				defaultValue={note?.body ?? ""}
				value={body}
				onChangeText={onChangeBody}
				placeholder="Body"
				className="h-full align-top"
			/>
			{/*Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
		</View>
	)
}
