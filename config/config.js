let config_data = null

// if the static data was already set. return it
if (config_data != null && config_data != undefined) {
  return config_data
}

config_data = {}
//LOAD JSON
global.gConfig = (process.env.NODE_ENV === undefined || process.env.NODE_ENV == null) 
  ? require('./beta.json') 
  : require(`./${process.env.NODE_ENV}.json`)
