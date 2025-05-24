import type { Config } from "jest"

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.vue$": "@vue/vue3-jest"
  },
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
    "^@/(.*)$": "<rootDir>/$1"
  },
  moduleFileExtensions: ["ts", "js", "vue", "json"],
  testMatch: ["**/__tests__/**/*.spec.[jt]s?(x)"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  collectCoverageFrom: [
    "components/**/*.{js,ts,vue}",
    "pages/**/*.{js,ts,vue}",
    "utils/**/*.{js,ts}",
    "!**/node_modules/**"
  ]
}

export default config
