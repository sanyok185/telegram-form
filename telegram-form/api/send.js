export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let name, phone, сity;

  // якщо JSON
  if (req.headers['content-type']?.includes('application/json')) {
    ({ name, phone, message } = req.body);
  } else {
    // якщо form-data (Webflow)
    name = req.body.name;
    phone = req.body.phone;
    message = req.body.сity;
  }

  const text = `
📝 Нова заявка:
👤 Ім'я: ${name}
📞 Телефон: ${phone}
💬 Повідомлення: ${сity}
  `;

  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
      }),
    });

    const data = await telegramRes.json();

    if (!data.ok) {
      console.log(data); // щоб бачити помилку Telegram
      throw new Error('Telegram error');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
