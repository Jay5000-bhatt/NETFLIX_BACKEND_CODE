const nodemailer = require("nodemailer");

function generateMail(to, subject, body) {
  return new Promise((resolve, reject) => {
    const email = "bhattjay114@gmail.com";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: "Your password",
      },
    });

    const mailOptions = {
      from: email,
      to,
      subject,
      html: body,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve("Email sent to: " + to + " successfully.");
      }
    });
  });
}

function successResponse(res, data, statusCode = 200) {
  return res.status(statusCode).json(data);
}

function failureResponse(res, error, statusCode = 500) {
  return res.status(statusCode).json(error);
}

module.exports = {
  generateMail,
  successResponse,
  failureResponse,
};
