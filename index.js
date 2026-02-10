const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

app.get("/", (req, res) => {
  res.send("Telegram bot is running!");
});

app.post("/webhook", async (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.sendStatus(200);
  }

  const chatId = message.chat.id;
  const text = message.text;

  let reply = "พิมพ์อะไรมา 😆";

  if (text === "/start") {
    reply = "สวัสดี! บอททำงานแล้ว 🚀";
  }

  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: reply,
  });

  res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server running"));
