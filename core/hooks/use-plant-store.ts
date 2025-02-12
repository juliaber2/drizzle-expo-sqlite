import { db } from "@/db/client"
import { plants, type SelectPlant } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import { create } from "zustand"

type PlantStore = {
	plants: SelectPlant[]
	actions: {
		refetch: () => void
	}
}

const usePlantStore = create<PlantStore>((set) => {
	const fetchStatement = db.select().from(plants).orderBy(desc(plants.id))
	try {
		return {
			plants: fetchStatement.all(),
			actions: {
				refetch: () => set({ plants: fetchStatement.all() }),
			},
		}
	} catch (error) {
		return {
			plants: [],
			actions: {
				refetch: () => set({ plants: fetchStatement.all() }),
			},
		}
	}
})

export const usePlants = () => usePlantStore((state) => state.plants)
export const usePlantActions = () => usePlantStore((state) => state.actions)

type EditPlantStore = {
	plant: { type: string | undefined; description: string | undefined, wateringProgram: string | undefined, sensor: string | undefined }
	actions: {
		onChangeType: (type: string) => void
		onChangeDescription: (description: string) => void
		onChangeWateringProgram: (wateringProgram: string) => void
		onChangeSensor: (sensor: string) => void
		savePlant: (id: string | undefined) => void
		deletePlant: (id: string) => void
	}
}

const useEditPlantStore = create<EditPlantStore>((set, get) => ({
	plant: { type: undefined, description: undefined, wateringProgram: undefined, sensor: undefined },
	actions: {
		onChangeType: (type) => set((state) => ({ plant: { ...state.plant, type } })),
		onChangeDescription: (description) => set((state) => ({ plant: { ...state.plant, description } })),
		onChangeWateringProgram: (wateringProgram) => set((state) => ({ plant: { ...state.plant, wateringProgram } })),
		onChangeSensor: (sensor) => set((state) => ({ plant: { ...state.plant, sensor } })),
		savePlant: (id) => {
			const { type, description, wateringProgram, sensor } = get().plant

			// TODO: what fields should be filled and can't be not defined
			if (!type) return

			console.log("-->> savePlant: type=" + type + ' description=' + description + ' watering_program=' + wateringProgram + ' sensor=' + sensor);

			const resultBefore = db.select().from(plants).all();
			console.log("-> BEFORE Get all plants before save :" + JSON.stringify(resultBefore));

			db.insert(plants)
				.values({ id: Number(id), type: type, description: description, watering_program: wateringProgram, sensor: sensor })
				.onConflictDoUpdate({
					target: plants.id,
					set: { type, updatedAt: new Date().toISOString() },
				})
				.run();

			const resultAfter = db.select().from(plants).all();
			console.log("-> AFTER Get all notes after save :" + JSON.stringify(resultAfter));

			set({ plant: { type: undefined, description: undefined, wateringProgram: undefined, sensor: undefined } })
			usePlantStore.getState().actions.refetch()
		},
		deletePlant: (id) => {

			console.log("deleteNote");

			db.delete(plants)
				.where(eq(plants.id, Number(id)))
				.run()
			usePlantStore.getState().actions.refetch()
		},
	},
}))

export const useEditPlant = () => useEditPlantStore((state) => state.plant)
export const useEditPlantActions = () => useEditPlantStore((state) => state.actions) 
