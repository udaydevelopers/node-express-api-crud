const mongoose = require('mongoose');
require('dotenv').config();

const dbHost = process.env.DB_HOSTS;
const dbOption = process.env.DB_OPTIONS;
const dbName = process.env.DB_NAME;
const dbPrefix = process.env.DB_PREFIX;
const dbUserName = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

//console.log(`DB Host: ${dbHost}, DB Port: ${dbPort}, DB Name: ${dbName}`);
const uri = `${dbPrefix}://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?${dbOption}`;
async function connectDB() {
  try {
    
    mongoose.connect(
        `${uri}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
  
      // Check if connected to the database
      const dbConnection = mongoose.connection;
      dbConnection.on("connected", () => {
        console.log("Connected to the database");
      });
  
      dbConnection.on("error", (err) => {
        console.log("Error connecting to the database", err);
      });
  
      console.log("Database connection established");

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

module.exports = { connectDB };
