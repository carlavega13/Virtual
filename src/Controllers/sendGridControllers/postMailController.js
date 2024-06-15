const sgMail = require("./SendGridSetApiKey");

const postMailController = async (info) => {
  try {
    const msg = {
      subject: info.subject,
      to: info.to,
      html: info.text,
      from: "carlavega231323@gmail.com",
    };
    const response = await sgMail.send(msg);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = postMailController;
