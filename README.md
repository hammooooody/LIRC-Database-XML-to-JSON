# Infrared Remote Control XML to JSON Converter

Converts IR XML database files for remote controls by [@probonopd](https://github.com/probonopd) [LIRC Database](https://github.com/probonopd/lirc-remotes) to individual json files based on brand. It uses XML to JavaScript object converter [node-xml2js](https://github.com/Leonidas-from-XIV/node-xml2js).

# Dependencies / Requirements

Install [node-xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) before you begin by:

`npm i --save xml2js`

# Description

If you need an existing powerful IR database, but you need it locally in JSON format so your javascript program can grab it easily, this is a solution you can use.
Its main job is to convert XML infrared (LIRC) databases into json files for each brand.

**Output**

Each json file looks something like this

`lg.json`

```
[
  {
    "model": "LG_42H3000",
    "buttons": [
      {
        "name": "KEY_POWER",
        "code": "0000 006d 0022 0000 0156 ...",
        "codeno": "0x00000000000010EF",
        "decoding": {
          "protocol": "NEC",
          "device": "4",
          "subdevice": "-1",
          "obc": "8",
          "hex0": "239",
          "hex1": "-1",
          "hex2": "-1",
          "hex3": "-1",
          "misc": "no repeat",
          "error": ""
        }
      },
      {
        "name": "KEY_OK",
        "code": "0000 006d 0022 0000 0156 ...",
        "codeno": "0x000000000000D02F",
        "decoding": {
          "protocol": "NEC",
          "device": "4",
          "subdevice": "-1",
          "obc": "11",
          "hex0": "47",
          "hex1": "-1",
          "hex2": "-1",
          "hex3": "-1",
          "misc": "no repeat",
          "error": ""
        }
      },
      ...
    ]
  },
  ...
]

```

- The json file name represents the brand of device.
- `model` >> model number/code within a brand.
- `buttons` >> list of buttons in that remote controller.
- `name` >> key name e.g. `VOLUMN_UP` and `POWER`.
- `code` >> Pronto HEX IR code.
- `codeno` >> referenced by the XML database.
- `decoding` additional information on the code type and device (Relates to LIRC library)

# Usage

- Download the `lirc-remotes-xml` folder form the repo [LIRC Database](https://github.com/probonopd/lirc-remotes) and place it in the same folder as `main.js` and `convertOneXmlToJson.js`.
- Create a folder called `output` on the root folder.
- run `node main.js`

All generated files can be found in `output` folder.

That's it!
