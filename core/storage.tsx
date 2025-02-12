
// Create a Zustand store with AsyncStorage persistence
import { create } from 'zustand';
//import type { PersistOptions } from 'zustand/middleware';

// Define the type for our key-value store
interface StorageState {
  storage: Record<string, any>;
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => string | undefined;
  removeItem: (key: string) => void;
}

// Define the persist configuration to use AsyncStorage
// type StoragePersist = (
//   config: (set: any, get: any) => StorageState,
//   options: PersistOptions<StorageState>
// ) => (set: any, get: any) => StorageState;

const useStore = create<StorageState>(
    (set, get) => ({
      // Initial empty key-value store
      storage: {},

      // Function to set a value for a specific key
      setItem: (key, value) =>
        set((state) => ({
          storage: { ...state.storage, [key]: value }
        })),

      // Function to retrieve a value by key
      getItem: (key) => {
        return get().storage[key];
      },

      // Function to remove a specific key
      removeItem: (key) =>
        set((state) => {
          const updatedStorage = { ...state.storage };
          delete updatedStorage[key];
          return { storage: updatedStorage };
        }),
    })
);

export default useStore;


