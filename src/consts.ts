import { homedir } from "os";
import { join } from "path";

export const DEFAULT_CONFIG_FILENAME = ".fsg.json";
export const INTERNAL_CONFIG_PATH = join(__dirname, "config", DEFAULT_CONFIG_FILENAME);
export const DEFAULT_SCHEMA_NAME = "default";
export const HOMEDIR_CONFIG_FILE = join(homedir(), DEFAULT_CONFIG_FILENAME);
export const START_BASE_DIR = join(".");
