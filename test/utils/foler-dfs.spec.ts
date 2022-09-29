import { faker } from "@faker-js/faker";
import { FolderConfig } from "../../src/types";
import { generateFolderArray } from "../../src/utils/folder-dfs";

describe("Folder generation", () => {
  describe("Folder DFS", () => {
    it("Should return correct folder array", () => {
      // Given
      const folderConfig: FolderConfig = {
        application: ["tests"],
        folder1: [],
        folder2: {
          subfolder1: ["domain", "database"],
          subfolder2: [],
        },
      };

      const baseDir = faker.random.word();

      const expected: string[] = [
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

      // When
      const result = generateFolderArray(folderConfig, baseDir);

      // Then
      expect(result).toEqual(expected);
    });
  });
});
