const { Event,User } = require("../../db");
const userAllEvents = async ({ userId }) => {
  try {
    const admin=await User.findOne({where:{id:userId,rol:"admin"}})
    if(!admin){
        throw Error("You are not authorized to view all events");
    }
    const events = await Event.findAll();
    return events;
  } catch (error) {
    throw Error(error.message);
  }
};
module.exports = userAllEvents;
