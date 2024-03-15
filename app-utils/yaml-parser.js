const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path")

const retrieveApiKey = () => {
  const pathToFile = path.resolve(__dirname, "../../config.yaml");

  const yamlData = fs.readFileSync(pathToFile, "utf8");

  try {
    const constants = yaml.load(yamlData);
    const apiKey = constants.api_key;
    if (apiKey) {
      return apiKey
    }
  } catch (error) {
    if (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = {
  retrieveApiKey
}
