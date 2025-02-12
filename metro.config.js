const { getDefaultConfig } = require("expo/metro-config")
const { withNativeWind } = require("nativewind/metro")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.resolver.sourceExts.push("sql")

// Adds support for `.db` files for SQLite databases
config.resolver.assetExts.push("db");
config.resolver.assetExts.push("txt");
config.resolver.assetExts.push("kuku");
module.exports = withNativeWind(config, { input: "./styles/global.css" })
