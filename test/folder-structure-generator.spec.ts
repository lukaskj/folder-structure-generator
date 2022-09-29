import { faker } from "@faker-js/faker";
import fs from "fs";
import { DEFAULT_SCHEMA_NAME } from "../src/consts";
import { FolderStructureGenerator } from "../src/folder-structure-generator";
import { ParentConfig } from "../src/types";

describe("FolderStructureGenerator Class", () => {
  let baseDir = "";
  let parentConfig: ParentConfig = {};
  let folderConfigGeneratedList: string[] = [];

  beforeEach(() => {
    baseDir = faker.random.word();

    parentConfig = {
      default: {
        application: ["tests"],
        folder1: [],
        folder2: {
          subfolder1: ["domain", "database"],
          subfolder2: [],
        },
      },
    };

    folderConfigGeneratedList = [
      baseDir,
      `${baseDir}\\application`,
      `${baseDir}\\application\\tests`,
      `${baseDir}\\folder1`,
      `${baseDir}\\folder2`,
      `${baseDir}\\folder2\\subfolder1`,
      `${baseDir}\\folder2\\subfolder1\\domain`,
      `${baseDir}\\folder2\\subfolder1\\database`,
      `${baseDir}\\folder2\\subfolder2`,
    ];

    jest.resetAllMocks();
  });

  it("Should create all folders correctly", async () => {
    const mkdirSpy = jest.spyOn(fs.promises, "mkdir").mockResolvedValue("true");
    // given
    const folderStructureGenerator = new FolderStructureGenerator(baseDir, parentConfig, DEFAULT_SCHEMA_NAME);

    const mkdirCalls = folderConfigGeneratedList.map((folder) => [folder, { recursive: true }]);
    // when
    const folderLog = await folderStructureGenerator.createFolders();

    // then
    expect(mkdirSpy).toHaveBeenCalledTimes(folderConfigGeneratedList.length);
    expect(mkdirSpy.mock.calls).toEqual(mkdirCalls);
    expect(folderLog.created).toEqual(folderConfigGeneratedList);
    expect(folderLog.notCreated.length).toEqual(0);
  });

  it("Should not create folders when mkdir returns undefined", async () => {
    const mkdirSpy = jest.spyOn(fs.promises, "mkdir").mockResolvedValue(undefined);
    // given
    const folderStructureGenerator = new FolderStructureGenerator(baseDir, parentConfig, DEFAULT_SCHEMA_NAME);

    const spyCalls = folderConfigGeneratedList.map((folder) => [folder, { recursive: true }]);
    // when
    const folderLog = await folderStructureGenerator.createFolders();

    // then
    expect(mkdirSpy).toHaveBeenCalledTimes(folderConfigGeneratedList.length);
    expect(mkdirSpy.mock.calls).toEqual(spyCalls);
    expect(folderLog.created.length).toEqual(0);
    expect(folderLog.notCreated).toEqual(folderConfigGeneratedList);
  });
});
