import type { NextApiRequest, NextApiResponse } from 'next';
import Parser from 'rss-parser';

const parser = new Parser();

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { url } = request.query;

  if (!url || typeof url !== 'string') {
    return response.status(400).json({ error: 'URL is required' });
  }

  try {
    const feed = await parser.parseURL(url);
    response.status(200).json(feed);
  } catch (error) {
    response.status(500).json({ error: 'Error fetching RSS feed' });
  }
}
