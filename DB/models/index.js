const path = require('path');
const { Sequelize, DataTypes, Model} = require('sequelize');

const env = process.env.NODE_ENV || 'test'
const config = require(path.join(__dirname,'..','config','config'))[env];
const sequelize = new Sequelize(config.database,config.username,config.password,config);
const db = new Object;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//module define(ver);
db.userToken = require('./userToken')(sequelize,DataTypes);


module.exports = db;