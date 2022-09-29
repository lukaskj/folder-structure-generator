import { faker } from "@faker-js/faker";
import fs from "fs";

import { FolderStructureGeneratorBuilder } from "../src/folder-structure-generator-builder";
import { DEFAULT_SCHEMA_NAME } from "../src/consts";

const CORRECT_CONFIG_FILE = "./test/mocks/correct-config.json";
const INCORRECT_CONFIG_FILE = "./test/mocks/incorrect-config.json";

describe("FolderStructureGenerator Class", () => {
  let baseDir = "";

  beforeEach(() => {
    baseDir = faker.random.word();

    jest.resetAllMocks();
  });

  it("Should create FolderStructureGenerator object", async () => {
    // given
    const existsSyncSpy = jest.spyOn(fs, "existsSync").mockReturnValue(true);
    const filePath = CORRECT_CONFIG_FILE;

    const builder = new FolderStructureGeneratorBuilder();
    builder.setBaseDir(baseDir);
    builder.setConfigFile(filePath);
    builder.setSchema(DEFAULT_SCHEMA_NAME);

    // when
    const resultPromise = builder.build();

    // then
    await expect(resultPromise).resolves.not.toThrow();
    const result = await resultPromise;

    expect(existsSyncSpy).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  it("Should throw when schema is not in configurations file", async () => {
    // given
    const existsSyncSpy = jest.spyOn(fs, "existsSync").mockReturnValue(true);
    const filePath = INCORRECT_CONFIG_FILE;
    const incorrectSchema = faker.random.word();

    const builder = new FolderStructureGeneratorBuilder();
    builder.setBaseDir("");
    builder.setConfigFile(filePath);
    builder.setSchema(incorrectSchema);

    // when
    const resultPromise = builder.build();

    // then
    await expect(resultPromise).rejects.toThrow(`Schema ${incorrectSchema} not found at`);
    expect(existsSyncSpy).toHaveBeenCalled();
  });
});
