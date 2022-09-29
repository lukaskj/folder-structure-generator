import { existsSync } from "fs";
import { format as pathFormat, parse as pathParse, resolve as pathResolve } from "path";
import { INTERNAL_CONFIG_PATH, START_BASE_DIR } from "./consts";
import { FolderStructureGenerator } from "./folder-structure-generator";
import { ParentConfig } from "./types";

export class FolderStructureGeneratorBuilder {
  private configuration!: ParentConfig;
  private configFile!: string;
  private schema!: string;
  private baseDir!: string;

  public setBaseDir(baseDir: string | undefined): this {
    this.baseDir = baseDir || START_BASE_DIR;
    return this;
  }

  public setConfigFile(configFile: string): this {
    this.configFile = configFile;
    return this;
  }

  public setSchema(schema: string): this {
    this.schema = schema;
    return this;
  }

  public async validate(): Promise<this> {
    let configFile = INTERNAL_CONFIG_PATH;
    if (existsSync(this.configFile)) {
      const parsed = pathParse(this.configFile);
      configFile = pathResolve(pathFormat(parsed));
    }
    const configuration: ParentConfig = (await import(configFile)).default;
    if (!configuration) {
      throw new Error(`Configuration not found at ${configFile}`);
    }
    this.configFile = configFile;

    if (!(this.schema in configuration)) {
      throw new Error(`Schema ${this.schema} not found at ${this.configFile}`);
    }

    this.configuration = configuration;
    return this;
  }

  public async build(): Promise<FolderStructureGenerator> {
    await this.validate();
    return new FolderStructureGenerator(this.baseDir, this.configuration, this.schema);
  }
}
