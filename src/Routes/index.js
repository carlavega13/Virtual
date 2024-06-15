const { Router } = require("express");
const postUser = require("./UserRoutes/postUser");
//
const router = Router();
router.post("/postUser",postUser)
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
