# Folder Structure Generator

Generates folders based on a config file.

## Installation

Install globally:

```sh
npm install -g @lukaskj/folder-structure-generator
```
## Usage

### Command Line

```
Options:
      --help     Show help                               [boolean]
      --version  Show version number                     [boolean]
  -c, --config   Config file          [default: "$HOME/.fsg.json"]
  -s, --schema   Schema name                  [default: "default"]
```

### Examples

Using the following JSON as the config for the examples (file `.fsg.json` on user home directory):
```json
{
  "default": {
    "folder1": {
      "subfolder1": [],
      "subfolder2": {
        "sub-subfolder2a": []
      }
    },
    "folder2": []
  },
  "other-schema": {
    "new-folder": []
  }
}
```

Default usage:
```bash
$ fsg
[*] Folders created: 
+ folder1
+ folder1\subfolder1
+ folder1\subfolder2
+ folder1\subfolder2\sub-subfolder2a
+ folder2
```

Specifying a base directory:
```bash
$ fsg base-dir
[*] Folders created: 
+ base-dir
+ base-dir\folder1
+ base-dir\folder1\subfolder1
+ base-dir\folder1\subfolder2
+ base-dir\folder1\subfolder2\sub-subfolder2a
+ base-dir\folder
```

Specifying a schema:
```bash
$ fsg -s other-schema
[*] Folders created: 
+ new-folder
```

Specifying another config file:
```bash
$ fsg -c $HOME/other-config.json
[*] Folders created: 
+ new-folder1
+ new-folder2
+ new-folder3
```

