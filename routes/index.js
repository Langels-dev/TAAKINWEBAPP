// GOOGLE DEVELOPERS URL = "https://developers.google.com/oauthplayground/#step2&apisSelect=https%3A%2F%2Fmail.google.com%2F&auth_code=4%2F0AX4XfWgqdqZlFLvKdLJ8BUb5SaDCswdfRyoFyhlG3F0pLw1xgxGvxKpHDYdOEnElgLMXrA&refresh_token=1%2F%2F04loUUC3AOin2CgYIARAAGAQSNwF-L9Ir7dElBUyBkvd7EFomJaGTItgSNDbiCmkejxNQ7C-DzByUmIFeJhNX26tBAXWP5ZT0MAE&access_token_field=ya29.a0ARrdaM8weWLLjLJeRHh_4_Z5YYlqr3eT_JdN8fkJKz0crF4hYu3y8lkK_NBr8-Ie1CjYtRbgNBmRNJPozzXC3CrZlGRG8Q0MVV4JaiF5ByjU3BBsipC6wVCvVuNF_0gRm65siU6s_UrhS1KT-zvOXf3qwgyD&url=https%3A%2F%2F&content_type=application%2Fjson&http_method=GET&useDefaultOauthCred=checked&oauthEndpointSelect=Google&oauthAuthEndpointValue=https%3A%2F%2Faccounts.google.com%2Fo%2Foauth2%2Fv2%2Fauth&oauthTokenEndpointValue=https%3A%2F%2Foauth2.googleapis.com%2Ftoken&oauthClientId=625169957238-44r5h6i7l03r9j4m608kavde74n426es.apps.googleusercontent.com&expires_in=3598&oauthClientSecret=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&access_token_issue_date=1653349954&for_access_token=ya29.a0ARrdaM8weWLLjLJeRHh_4_Z5YYlqr3eT_JdN8fkJKz0crF4hYu3y8lkK_NBr8-Ie1CjYtRbgNBmRNJPozzXC3CrZlGRG8Q0MVV4JaiF5ByjU3BBsipC6wVCvVuNF_0gRm65siU6s_UrhS1KT-zvOXf3qwgyD&includeCredentials=checked&accessTokenType=bearer&autoRefreshToken=checked&accessType=offline&prompt=consent&response_type=code&wrapLines=on"

const express = require("express");
const nodemailer = require("nodemailer");
const { google, Auth } = require("googleapis");
const router = express.Router();

router.post("/send-email", (req, res) => {
  const { name, mail, number, msg } = req.body;
  const contentHtml = `
    <h1> TAAKIN FORM </h1>
    <ul>
        <li>Name: ${name}</li>
        <li>Email: ${mail}</li>
        <li>Phone: ${number}</li>
    <ul>
    <p>${msg}</p>
    `;

  const CLIENTD_ID =
    "625169957238-44r5h6i7l03r9j4m608kavde74n426es.apps.googleusercontent.com";
  const CLIENT_SECRET = "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";
  const REDIRECT_URI = "https://developers.google.com/oauthplayground";
  const REFRESH_TOKEN =
    "1//04loUUC3AOin2CgYIARAAGAQSNwF-L9Ir7dElBUyBkvd7EFomJaGTItgSNDbiCmkejxNQ7C-DzByUmIFeJhNX26tBAXWP5ZT0MAE";

  const oAuth2Client = new google.auth.OAuth2(
    CLIENTD_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  async function sendMail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "infotaakin@gmail.com",
          clientId: CLIENTD_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: "WEBPAGE TAAKIN <infotaakin@gmail.com>",
        to: "info@taakinmetals.com",
        subject: `MESSAGE FROM ${name.toUpperCase().toString()}`,
        html: contentHtml,
      };

      const result = await transporter.sendMail(mailOptions);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  sendMail()
    .then((result) => res.redirect("/contact"))
    .catch((error) => console.log(error.message));
});

module.exports = router;
