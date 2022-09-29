import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { DEFAULT_SCHEMA_NAME, HOMEDIR_CONFIG_FILE } from "./consts";
import { FolderStructureGeneratorBuilder } from "./folder-structure-generator-builder";
import { Args, FolderLog } from "./types";

async function parseArguments(): Promise<Args> {
  return await yargs(hideBin(process.argv))
    .option("config", {
      alias: "c",
      description: "Config file",
      default: HOMEDIR_CONFIG_FILE,
    })
    .option("schema", {
      alias: "s",
      description: "Schema name",
      default: DEFAULT_SCHEMA_NAME,
    })
    // .strict()
    .epilog("Github: @lukaskj/folder-structure-generator")
    .parse();
}

async function main(): Promise<void> {
  const args = await parseArguments();
  try {
    const folderStructureGenerator = await new FolderStructureGeneratorBuilder()
      .setConfigFile(args.config)
      .setSchema(args.schema)
      .setBaseDir(args._.shift() as string | undefined)
      .build();
    const log = await folderStructureGenerator.createFolders();
    printLog(log);
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
  }
}

function printLog(logObject: FolderLog): void {
  const created = logObject.created.reduce((prev, cur) => prev + `+ ${cur}\n`, "[*] Folders created: \n");
  const notCreated = logObject.notCreated.reduce((prev, cur) => prev + `- ${cur}\n`, "[*] Not created: \n");
  console.log(created);
  console.log(notCreated);
}

main();
