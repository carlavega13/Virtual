const { Router } = require("express");
const postUser = require("./UserRoutes/postUser");
const postLogin = require("./UserRoutes/postLogin");
const postRequestPasswordReset = require("./UserRoutes/postRequestPasswordReset");
const putEditUser = require("./UserRoutes/putEditUser");
const putUserPassword = require("./UserRoutes/putUserPassword");
const postEvent = require("./EventsRoutes/postEvent");
//
const router = Router();
router.post("/postUser",postUser)
router.post("/login",postLogin)
router.get("/requestPasswordRecovery/:email",postRequestPasswordReset)
router.put("/editUser/:id",putEditUser)
router.put("/changePassword",putUserPassword)
router.post("/createEvent",postEvent)
router.get("/", (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Soy un web service</title>
  </head>
  <body>
      <h1>Soy un web service</h1>
      <!-- El contenido de tu página web puede ir aquí -->
  </body>
  </html>s
  `;
  res.status(200).send(html);
});
module.exports = router;
