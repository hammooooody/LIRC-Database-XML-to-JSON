const { readdirSync, writeFile } = require("fs");
const convertOneXmlToJson = require("./convertOneXmlToJson");

const getDirectoriesNames = path =>
  readdirSync(path, { withFileTypes: true })
    .filter(file => file.isDirectory())
    .map(file => file.name);

const getXmlFilesNames = path =>
  readdirSync(path, { withFileTypes: true })
    .filter(file => /\.xml$/.test(file.name))
    .map(file => file.name);

let listOfBrandsDirectories = getDirectoriesNames(__dirname + "/lirc-remotes-xml");
let listOfBrandsAndFiles = listOfBrandsDirectories.map(folderName => {
  return { brand: folderName, files: getXmlFilesNames(__dirname + `/lirc-remotes-xml/${folderName}`) };
});

const main = () => {
  listOfBrandsAndFiles.forEach(async blob => {
    let compoundedBrandObject = [];
    for (let index in blob.files) {
      try {
        let oneXmlJson = await convertOneXmlToJson(__dirname + `/lirc-remotes-xml/${blob.brand}/${blob.files[index]}`);
        compoundedBrandObject = [...compoundedBrandObject, ...oneXmlJson];
      } catch (error) {
        console.log(error);
      }
    }
    writeFile(__dirname + `/output/${blob.brand}.json`, JSON.stringify(compoundedBrandObject), err => {
      if (err) console.log("ERROR >>, ", err);
    });
  });
};

main();
