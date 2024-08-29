
require('dotenv').config({ path: __dirname + "/../.env" });
/**
 * configure database for use in sequelize-cli and default connection
 */
module.exports = {
  "app_development":{
    name:"Jumbo Api"
  },
  "app_production":{
    name:"Jumbo Api"
  },
  "smtp_development": {
      host: "smtp.jumboalimentos.com.br",
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
          user: process.env.API_EMAIL || "jumbo.ti@jumboalimentos.com.br",
          pass: process.env.API_EMAIL_PASSWORD ||"1#__Racnela07__XY##Z",
      },
      tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
      },
  },
  "smtp_production": {
      host: "smtp.jumboalimentos.com.br",
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
          user: process.env.API_EMAIL || "jumbo.ti@jumboalimentos.com.br",
          pass: process.env.API_EMAIL_PASSWORD ||"1#__Racnela07__XY##Z",
      },
      tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
      }
  }
}
  