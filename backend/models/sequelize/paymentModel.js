
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const Payment = sequelize.define('Payment', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modeOfPayment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
});

module.exports = Payment;
