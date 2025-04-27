
import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv"

dotenv.config();
console.log(process.env.MAILTRAP_TOKEN);

export const mailtrapClient = new MailtrapClient({
  endpoint: "https://send.api.mailtrap.io/",
  token: "c8f6757e0300c359181d77fa2c839010",
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};
// const recipients = [
//   {
//     email: "spriyansumeitei@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
  // node .\backend\mailtrap\mailtrap.config.js