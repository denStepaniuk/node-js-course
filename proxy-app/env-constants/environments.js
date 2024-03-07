const {retrieveApiKey} = require('../utils/yaml-parser')

const APP_LOCAL_PORT = 4000;
const NASA_API_KEY = retrieveApiKey();


module.exports = {
  APP_LOCAL_PORT,
  NASA_API_KEY,
}