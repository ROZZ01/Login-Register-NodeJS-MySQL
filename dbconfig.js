const mysql = require('mysql');
require('dotenv').config();


const dbConnection = mysql.createConnection({
    host     : process.env.DB_HOST, // MYSQL HOST NAME
    user     : process.env.DB_USER,        // MYSQL USERNAME
    password : process.env.DB_PASS,    // MYSQL PASSWORD
    database : process.env.DB_NAME,      // MYSQL DB NAME
    port : process.env.DB_PORT,
    multipleStatements : true
});

dbConnection.connect((err)=>{
    if(err){
      console.log("not connected");
      console.log(err);
    }
    else{
      console.log("connected");
    }
  });

module.exports = dbConnection;



