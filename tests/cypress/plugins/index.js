// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile(file) {
  const pathToConfigFile = `config/${file}.json`;
  return fs.readJson(path.join(__dirname, '../../../', pathToConfigFile))
}

module.exports = (on, config) => {
  const enviroment = config.env.configFile;
  const configForEnviroment = getConfigurationByFile(enviroment);

  on('task', require('../support/mongo-client'));

  return (configForEnviroment)
    ? configForEnviroment
    : config;
}
