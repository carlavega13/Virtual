const htmlTicketPurchased = (info) => {
  return `<!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenido a events-app</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  color: #333;
                  line-height: 1.6;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  color: #333;
              }
              p {
                  margin: 0 0 10px;
              }
              .credentials {
                  background-color: #f9f9f9;
                  border: 1px solid #ddd;
                  padding: 10px;
                  border-radius: 5px;
              }
              .credentials p {
                  margin: 5px 0;
                  font-weight: bold;
              }
              .footer {
                  margin-top: 20px;
                  text-align: center;
                  font-size: 0.9em;
                  color: #777;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>¡Thank you for purchasing a ticket to the ${info.title} event!</h1>
               <p>
               Next, you can
               see your ticket information. </p>
              <div class="credentials">
                  <p><strong>Event Name:</strong> ${info.title}</p>
                  <p><strong>Ticket Code:</strong>${info.ticket_code}</p>
                  <p><strong>Event Date:</strong>${info.date}</p>
              </div>
              <p>If you have any questions or need assistance, please do not hesitate to contact our support team.</p>
              <p class="footer">¡Welcome to events-app!</p>
              <p class="footer">Best regards,<br>The events-app team</p>
          </div>
      </body>
      </html>`;
};
module.exports = htmlTicketPurchased;
