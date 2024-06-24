module.exports = {
  HOST: "localhost",
  USER: "us_inventory_admin",
  PASSWORD: "user123",
  DB: "inventory",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
