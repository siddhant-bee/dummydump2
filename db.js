const Pool = require("pg").Pool;

const pool = new Pool({
    user:"siddhant",
    password:"1234",
    host:"localhost",
    port: 5432,
    database:"basictodo"
});

module.exports= pool;