import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // this should be the actual path not a rewritten path

    const model = req.body.model;

    let pathToRevalidate = '';
    const { locale } = req.body.entry;

    switch (model) {
      case 'about':
        pathToRevalidate = `/${locale}/about`;
        break;
      case 'archive':
        pathToRevalidate = `/archive`;
        // this code snippet was added like this since the archive have no localization on the API part.
        // For now this works.
        console.log('Path to revalidate: ', pathToRevalidate);
        await res.revalidate(pathToRevalidate);
        pathToRevalidate = `/ar/archive`;
        break;
      case 'comic':
        const { id } = req.body.entry;
        const { slug } = req.body.entry?.archive;
        pathToRevalidate = `/${locale}/comics/${slug}/${id}`;
        break;
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
