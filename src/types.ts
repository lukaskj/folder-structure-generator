export type Args = {
  $0: string;
  _: (string | number)[];
  config: string;
  schema: string;
};

export type ParentConfig = {
  [key: string]: FolderConfig;
};

export type FolderConfig =
  | string[]
  | {
      [key: string]: FolderConfig;
    };

export type FolderLog = {
  created: string[];
  notCreated: string[];
};
