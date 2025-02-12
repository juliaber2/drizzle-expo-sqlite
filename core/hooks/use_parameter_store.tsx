import { db } from "@/db/client"
import { parameters, type SelectParameter } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import { create } from "zustand"

type ParameterStore = {
    parameters: SelectParameter[]
    actions: {
        refetch: () => void
    }
}

const useParametersStore = create<ParameterStore>((set) => {
    const fetchStatement = db.select().from(parameters).orderBy(desc(parameters.id))
    try {

        console.log("useParametersStore");
        return {
            parameters: fetchStatement.all(),
            actions: {
                refetch: () => set({ parameters: fetchStatement.all() }),
            },
        }
    } catch (error) {
        return {
            parameters: [],
            actions: {
                refetch: () => set({ parameters: fetchStatement.all() }),
            },
        }
    }
})

export const useParameters = () => useParametersStore((state) => state.parameters)
export const useParametersActions = () => useParametersStore((state) => state.actions)

type EditParameterStore = {
    parameter: { type: string | undefined; value: string | undefined }
    actions: {
        onChangeValue: (value: string) => void
        saveParameter: (id: Number | undefined) => void
        deleteParameter: (id: string) => void
    }
}

const useEditParameterStore = create<EditParameterStore>((set, get) => ({
    parameter: { type: undefined, value: undefined },
    actions: {
        onChangeValue: (value) => set((state) => ({ parameter: { ...state.parameter, value } })),
        saveParameter: (id) => {
            const { type, value } = get().parameter
            if (!type && !value) return

            console.log("saveParameter:" + type + ", " + value);

            db.insert(parameters)
                .values({ id: Number(id), type, value })
                .onConflictDoUpdate({
                    target: parameters.id,
                    set: { type, value, updatedAt: new Date().toISOString() },
                })
                .run();

            // DEBUG print
            const fetchStatement = db.select({ id: parameters.id, title: parameters.type, }).from(parameters).run();
            console.log("-> Get all parameters after save :" + JSON.stringify(fetchStatement));

            set({ parameter: { type: undefined, value: undefined } })
            useParametersStore.getState().actions.refetch()
        },
        deleteParameter: (id) => {

            console.log("deleteParameter: " + id);

            db.delete(parameters).where(eq(parameters.id, Number(id))).run()
            useParametersStore.getState().actions.refetch()
        },
    },
}))

// define hook functions
export const useEditParameter = () => useEditParameterStore((state) => state.parameter)
export const useEditParameterActions = () => useEditParameterStore((state) => state.actions) 
