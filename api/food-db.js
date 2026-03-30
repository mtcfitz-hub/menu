const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const KV_KEY = 'food_db';

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await redis.get(KV_KEY);
    return res.status(200).json(data || []);
  }

  if (req.method === 'POST') {
    const items = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Body must be a JSON array' });
    }
    await redis.set(KV_KEY, JSON.stringify(items));
    return res.status(200).json({ ok: true, count: items.length });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
};
