const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

module.exports = (sequelize) => {
 const users = sequelize.define('User', {
  // Model attributes are defined here
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false,
    unique: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contactNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, {
  // Other model options go here
});
 
  return users;
}


