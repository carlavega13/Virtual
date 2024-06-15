const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const EventParticipant = sequelize.define(
    "EventParticipant",
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
