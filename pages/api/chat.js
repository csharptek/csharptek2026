export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { session_id, user_message } = req.body;
    
    if (!session_id || !user_message) {
      return res.status(400).json({ error: 'Missing required fields: session_id or user_message' });
    }

    const apiBaseUrl = process.env.CHATBOT_API_BASE_URL || 'https://secreteryagent-production.up.railway.app/api';
    
    const response = await fetch(`${apiBaseUrl}/contact/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id,
        user_message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText || 'Error from chat API' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Chat API proxy error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
