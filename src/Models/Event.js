const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Event",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      available_tickets:{
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      ticket_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
