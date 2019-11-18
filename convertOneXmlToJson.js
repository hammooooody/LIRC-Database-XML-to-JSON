var fs = require("fs"),
  xml2js = require("xml2js");

const convertOneXmlToJson = path => {
  return new Promise((resolve, reject) => {
    var parser = new xml2js.Parser();

    let generatedArray = [];

    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      parser.parseString(data, (error, result) => {
        if (error) {
          console.log("----------- SKIPPED FILED -----------------");
          console.log(`***** FILE >>`, path);
          console.log("----------- SKIPPED FILED -----------------");
          reject(error);
        }

        if (result.lircremotes.remote === undefined || !result.lircremotes.remote.length) {
          console.log("----------- SKIPPED FILED -----------------");
          console.log(`***** FILE >>`, path);
          console.log("----------- SKIPPED FILED -----------------");
          reject("ERROR > result.lircremotes.remote is not defined or has 0 length!");
        }

        try {
          result.lircremotes.remote.forEach((remote, i) => {
            generatedArray = [...generatedArray, { model: remote.$.name, buttons: [] }]; //name of the model <remote name="DENON_RC1120_3">
            remote.code.forEach(code => {
              // console.log(code.ccf[0]);
              generatedArray[i].buttons = [
                ...generatedArray[i].buttons,
                {
                  name: code.$.name, //name of the button <code name="KEY_POWER" codeno="0x000000000000221C">
                  code: code.ccf[0], //<ccf>0000 006d 0010 0000 0012 0016 0012 003e 0012 0016 0012 0016 0012 0016 0012 003.....
                  codeno: code.$.codeno, //codeno of the button <code name="KEY_POWER" codeno="0x000000000000221C">
                  decoding: code.decoding ? code.decoding[0].$ : {} //<decoding protocol="Denon{1}" device="2" subdevice="-1" obc="225" hex0="135" hex1="-1" hex2="-1" hex3="-1" misc="no repeat" error=""/>
                }
              ];
            });
          });
          resolve(generatedArray);
        } catch (_error) {
          console.log("----------- SKIPPED FILED -----------------");
          console.log(`***** FILE >>`, path);
          console.log("----------- SKIPPED FILED -----------------");
          reject(_error);
        }
      });
    });
  });
};

module.exports = convertOneXmlToJson;
