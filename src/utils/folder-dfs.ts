import { FolderConfig } from "../types";
import { join } from "path";

export function generateFolderArray(folderConfig: FolderConfig, startDir: string): string[] {
  const folderSet = new Set<string>();
  _folderListDfs(folderConfig, startDir, folderSet);
  return Array.from(folderSet.values());
}

function _folderListDfs(folderConfig: FolderConfig, parent: string, folders: Set<string>): void {
  folders.add(join(parent));
  if (Array.isArray(folderConfig)) {
    for (const f of folderConfig) {
      folders.add(join(parent, f));
    }
  } else {
    for (const key in folderConfig) {
      _folderListDfs(folderConfig[key], join(parent, key), folders);
    }
  }
}
