import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // this should be the actual path not a rewritten path

    const model = req.body.model;
    const slug = req.body.entry.slug;
    let pathToRevalidate = '';

    switch (model) {
      case 'about':
        pathToRevalidate = `about`;
      case 'comics':
        pathToRevalidate = `/comics/${slug}`;
      default:
        break;
    }
    console.log('Path to revalidate: ', pathToRevalidate);

    await res.revalidate(pathToRevalidate);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
