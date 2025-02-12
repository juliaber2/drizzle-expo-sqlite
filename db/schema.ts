import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const notes = sqliteTable("notes", {
	id: integer("id").primaryKey(),
	title: text("title"),
	body: text("body"),
	createdAt: text("created_at")
		.default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`)
		.notNull(),
	updatedAt: text("updated_at"),
})

export const plants = sqliteTable('plants', {
	id: integer("id").primaryKey(),
	type: text("type"),
	description: text("description"),
	watering_program: text("watering_program"),
	sensor: text("sensor"),
	createdAt: text("created_at")
		.default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`)
		.notNull(),
	updatedAt: text("updated_at"),
})

// Due to problem in MMKV using with expo, we'll store settings into sqlite DB
// table with name parameters
export const parameters = sqliteTable('parameters', {
	id: integer("id").primaryKey(),
	type: text("type"),
	value: text("value"),
	createdAt: text("created_at")
		.default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`)
		.notNull(),
	updatedAt: text("updated_at"),
})

export const watering_program = sqliteTable('watering_program', {
	id: integer("id").primaryKey(),
	type: text("type"),
	content: text("content"),
	createdAt: text("created_at")
		.default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`)
		.notNull(),
	updatedAt: text("updated_at"),
})

export const sensor = sqliteTable('sensor', {
	id: integer("id").primaryKey(),
	type: text("type"),
	content: text("content"),
	createdAt: text("created_at")
		.default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`)
		.notNull(),
	updatedAt: text("updated_at"),
})

export type SelectNote = typeof notes.$inferSelect
export type SelectPlant = typeof plants.$inferSelect
export type SelectParameter = typeof parameters.$inferSelect
export type SelectWateringProgram = typeof watering_program.$inferSelect
export type SelectSensor = typeof sensor.$inferSelect