const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const UserModel = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
});

module.exports = UserModel;
