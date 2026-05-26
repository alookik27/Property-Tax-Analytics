export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get API key from environment
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

  if (!ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error: API key not set' });
  }

  try {
    const { messages, systemPrompt, model = "claude-3-5-sonnet-20241022" } = req.body;

    // Validate request
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages must be an array' });
    }

    if (!systemPrompt || typeof systemPrompt !== 'string') {
      return res.status(400).json({ error: 'Invalid request: systemPrompt is required' });
    }

    if (messages.length === 0) {
      return res.status(400).json({ error: 'Invalid request: messages cannot be empty' });
    }

    // Validate message structure
    const validMessages = messages.every(msg => msg.role && msg.content);
    if (!validMessages) {
      return res.status(400).json({ error: 'Invalid request: each message must have role and content' });
    }

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: 1024,
        system: systemPrompt,
        messages,
      }),
    });

    const data = await response.json();

    // Handle API errors
    if (!response.ok) {
      console.error('Anthropic API Error:', {
        status: response.status,
        message: data?.error?.message,
        type: data?.error?.type
      });

      if (response.status === 401) {
        return res.status(401).json({ error: 'Authentication failed: Invalid API key' });
      }

      if (response.status === 429) {
        return res.status(429).json({ error: 'Rate limit exceeded: Please try again later' });
      }

      return res.status(response.status).json({
        error: data?.error?.message || 'Failed to process request',
        type: data?.error?.type
      });
    }

    res.status(200).json(data);

  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}