const MongoClient = require('mongodb').MongoClient

const query = async function (config, collectionName, callback) {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(
      `${config.DATABASE_URL}/${config.DATABASE_NAME}`,
      {
        keepAlive: true
      },
      function(err, client) {
        console.error('error: ' + err)
        err ? reject(err) : resolve(client)
      }
    )
  })
    .then(function(client) {
      const collection = client.db(`${ config.DATABASE_NAME }`).collection(collectionName)
      const promise = new Promise(function(resolve, reject) {
        callback(resolve, reject, collection)
        client.close()
      })

      return promise
    })
    .catch(err => console.error('error: ' + err))
}

module.exports = {
  findDocuments: async function({ config, collectionName, filter } = {}) {
    return await query(
      config, 
      collectionName,
      function(resolve, reject, collection) {
        collection.find(filter).toArray(function(err, items) {
          err ? reject(err) : resolve(items)
        })
      }
    )
  },
  deleteDocuments: async function ({ config, collectionName, filter } = {}) {
    return await query(
      config,
      collectionName,
      function(resolve, reject, collection) {
        collection.remove(filter, function(err, docs) {
          err ? reject(err) : resolve(docs)
        })
      }
    )
  },
  createDocument: async function ({ config, collectionName, filter } = {}) {
    return await query(
      config,
      collectionName,
      function(resolve, reject, collection) {
        collection.insertOne(filter, function(err, docs) {
          err ? reject(err) : resolve(docs)
        })
      }
    )
  }
}
