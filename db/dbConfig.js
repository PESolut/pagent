const pgp = require("pg-promise")();

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'preme_dev',    
    user: 'preme_user',   
    password: 'preme123',       
};

const db = pgp(cn);

db.connect()
  .then(obj => {
    console.log('Local DB connected');
    obj.done();
  })
  .catch(error => {
    console.error('DB connection error:', error.message);
  });

module.exports = db;
