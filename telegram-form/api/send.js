export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phone, city } = req.body;

  const text = `
📝 Нова заявка:
👤 Ім'я: ${name}
📞 Телефон: ${phone}
💬 Повідомлення: ${city}
  `;

  const TELEGRAM_TOKEN = process.env.8229454375:AAFDowxTraZ1hB7zikAC6CWWmjRv_kv-eds;
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
      throw new Error('Telegram error');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
