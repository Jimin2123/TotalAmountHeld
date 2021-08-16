module.exports = (sequelize, DataTypes) => { 
  const userToken = sequelize.define('userToken', {
    tid : {
      type : DataTypes.STRING,
    },
    userID : {
      type : DataTypes.INTEGER,
    },
    tokenAddress : DataTypes.STRING,
    amountHeld : DataTypes.INTEGER
  },
  {
    tableName : 'userToken',
    timestamps : false
  });
  
  userToken.removeAttribute('id');

  return userToken;
};