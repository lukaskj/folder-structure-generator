import { FolderLog, ParentConfig } from "./types";
import { generateFolderArray } from "./utils/folder-dfs";
import { mkdir } from "fs/promises";

export class FolderStructureGenerator {
  private configuration: ParentConfig;
  private schema: string;
  private baseDir: string;

  constructor(baseDir: string, configuration: ParentConfig, schema: string) {
    this.baseDir = baseDir;
    this.configuration = configuration;
    this.schema = schema;
  }

  public async createFolders(): Promise<FolderLog> {
    const config = this.configuration[this.schema];
    const baseDir = this.baseDir;
    const folderArray = generateFolderArray(config, baseDir);
    const log: FolderLog = {
      created: [],
      notCreated: [],
    };
    for (const folder of folderArray) {
      const created = !!(await mkdir(folder, { recursive: true }));
      if (created) {
        log.created.push(folder);
      } else {
        log.notCreated.push(folder);
      }
    }
    return log;
  }
}
