export default function handler(req, res) {
  const { message = "" } = req.body || {};
  let reply = "Thanks for your message";

  if (message.toLowerCase().includes("automation")) {
    reply = "We can help automate your business";
  }

  res.status(200).json({ reply });
}
