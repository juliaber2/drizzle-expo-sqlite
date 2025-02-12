import { drizzle } from "drizzle-orm/expo-sqlite"
import { openDatabaseSync } from "expo-sqlite/next"
import { Asset } from "expo-asset";
import * as FileSystem from 'expo-file-system';
import { notes, parameters, plants } from "./schema";

// open local SQLite DB
const plant_db = openDatabaseSync("plant.db", { enableChangeListener: true })

// pass DB to drizzle driver, in general, it can be any DB, including local or cloud DB
export let db = drizzle(plant_db, { logger: true });

console.log('Before create table __drizzle_migrations: ' + JSON.stringify(plant_db));

export function initializeDb() {
   plant_db.execSync(
      `CREATE TABLE IF NOT EXISTS __drizzle_migrations (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         hash TEXT NOT NULL,
         created_at INTEGER NOT NULL
       );`
   );
   console.log('After create table __drizzle_migrations:: ' + JSON.stringify(plant_db));

   console.log('Before create table plants: ' + JSON.stringify(plant_db));

   plant_db.execSync(
         `CREATE TABLE notes (
         id integer PRIMARY KEY AUTOINCREMENT,
         title text,
         body text,
         created_at TEXT NOT NULL,
         updated_at text
      );`
   );



   plant_db.execSync(
      `CREATE TABLE IF NOT EXISTS plants (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         type TEXT,
         description TEXT,
         watering_program TEXT,
         sensor TEXT,
         created_at TEXT NOT NULL,
         updated_at TEXT
       );`
   );

   plant_db.execSync(
      `CREATE TABLE IF NOT EXISTS parameters (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT,
         value TEXT,
         created_at TEXT NOT NULL,
         updated_at TEXT
       );`
   );



}
export async function getFiles() {
   console.log('*** getFiles');

   let result = await Asset.loadAsync(require('../assets/data/plants.txt'))
   console.log('result:' + JSON.stringify(result));
   result.forEach(jsonFile => {	//
      console.log('txt:' + JSON.stringify(jsonFile));
      if (jsonFile.localUri)
         FileSystem.readAsStringAsync(jsonFile.localUri).then(content => {
            console.log(content);
            const plantsObj = JSON.parse(content);
         })
   })

   result = await Asset.loadAsync(require('../assets/data/sensor.txt'))
   console.log('result:' + JSON.stringify(result));
   result.forEach(jsonFile => {	//
      console.log('json:' + JSON.stringify(jsonFile));
      if (jsonFile.localUri)
         FileSystem.readAsStringAsync(jsonFile.localUri).then(content => {
            console.log(content);
            const plantsObj = JSON.parse(content);
         })

   })

};

export function getAllPlants() {

   console.log('*** Before getAllPlants: plantDb: ' + JSON.stringify(plant_db));
   const dataNotes = db.select().from(notes).all();
   console.log(' -->> After get from table: NOTES: ' + JSON.stringify(dataNotes));

   const dataPlants = db.select().from(plants).all();
   console.log(' -->> After get from table: PLANTS: ' + JSON.stringify(dataPlants));

   const dataParameters = db.select().from(parameters).all();
   console.log(' -->> After get from table: PARAMETERS: ' + JSON.stringify(dataParameters));

}

