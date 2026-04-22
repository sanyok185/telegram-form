export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
export default async function handler(req, res) {
  // дозволяємо тільки POST
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, phone, message } = req.body;

  const text = `
Нова заявка:
Ім'я: ${name}
Телефон: ${phone}
Повідомлення: ${city}
  `;

  await fetch(`https://api.telegram.org/8229454375:AAFwzhcSiDRaJhuggpNslWvaRZKcHlxa_Eo/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: "8229454375",
      text
    })
  });

  return res.status(200).json({ ok: true });
}
