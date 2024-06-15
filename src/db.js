require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_URL, DB_HOST, DB_PASSWORD, DB_USER } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/app`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/Models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/Models", file)));
  });
modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Ticket, Notification, EventParticipant, Event } =
  sequelize.models;

User.hasMany(Event, { foreignKey: "organizer_id" });
Event.belongsTo(User, { foreignKey: "organizer_id" });

User.hasMany(Ticket, { foreignKey: "user_id" });
Ticket.belongsTo(User, { foreignKey: "user_id" });

Event.hasMany(Ticket, { foreignKey: "event_id" });
Ticket.belongsTo(Event, { foreignKey: "event_id" });

User.hasMany(Notification, { foreignKey: "user_id" });
Notification.belongsTo(User, { foreignKey: "user_id" });

Event.hasMany(Notification, { foreignKey: "event_id" });
Notification.belongsTo(Event, { foreignKey: "event_id" });

User.belongsToMany(Event, { through: EventParticipant, foreignKey: "user_id" });
Event.belongsToMany(User, {
  through: EventParticipant,
  foreignKey: "event_id",
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
