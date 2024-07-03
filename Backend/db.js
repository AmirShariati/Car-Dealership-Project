const { MongoClient } = require("mongodb");

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect("mongodb://localhost:27017/CarDealership").then(
      (client) => {
        dbConnection = client.db();
        return cb();
      }
    );
  },
  getDb: () => dbConnection,
};
