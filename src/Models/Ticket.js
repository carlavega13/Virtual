const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Ticket = sequelize.define(
    "Ticket",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      purchase_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:Date.now()
      },
      ticket_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      ticket_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
