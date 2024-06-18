const { Router } = require("express");
const postUser = require("./UserRoutes/postUser");
const postLogin = require("./UserRoutes/postLogin");
const postRequestPasswordReset = require("./UserRoutes/postRequestPasswordReset");
const putEditUser = require("./UserRoutes/putEditUser");
const putUserPassword = require("./UserRoutes/putUserPassword");
const postEvent = require("./EventsRoutes/postEvent");
const putEvent = require("./EventsRoutes/putEvent");
const deleteEvent = require("./EventsRoutes/deleteEvent");
const getEvents = require("./EventsRoutes/getEvents");
const postTicket = require("./TicketsRoutes/postTicket");
const getUserTickets = require("./TicketsRoutes/getUserTickets");
const postSearchUser = require("./EventsRoutes/getSearchUser");
const getPastAndFutureEvents = require("./EventsRoutes/getPastAndFuturesEvents");
const getSendReminder = require("./EventsRoutes/getSendReminder");
//
const router = Router();
router.post("/postUser",postUser)
router.post("/login",postLogin)
router.post("/createEvent",postEvent)
router.post("/postTicket",postTicket)
router.get("/requestPasswordRecovery/:email",postRequestPasswordReset)
router.get("/getEvents/:userId",getEvents)
router.get("/getUserTickets/:id",getUserTickets)
router.get("/searchEvents/:text",postSearchUser)
router.get("/getPastAndFutureEvents/:id",getPastAndFutureEvents)
router.get("/sendEventReminder/:id",getSendReminder)
router.put("/editUser/:id",putEditUser)
router.put("/changePassword",putUserPassword)
router.put("/editEvent",putEvent)
router.delete("/deleteEvent",deleteEvent)
module.exports = router;
