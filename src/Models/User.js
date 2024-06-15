const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      rol:{
        type:DataTypes.STRING,
        defaultValue:"user"
      },
      name: {
        type: DataTypes.STRING,
      },
      contact_details: {
        type: DataTypes.STRING,
      },
      profile_picture: {
        type: DataTypes.STRING,
      },
      reset_password_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reset_password_expires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { timestamps: true }
  );
};
