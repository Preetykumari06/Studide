const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const ProductModel = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
});

module.exports = ProductModel;
