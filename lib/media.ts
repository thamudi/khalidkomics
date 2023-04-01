import { getStrapiURL } from './api';

export function getStrapiMedia(media: any) {
  try {
    const { url } = media.data.attributes ? media.data.attributes : media.data;

    /**
     * This is a quick hack because sometimes digital ocean doesn't send the https with the url for some reason.
     * This script below wont affect regular images with proper url structure.
     */

    const pattern = new RegExp('^(http|https)://', 'i');
    let imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
    imageUrl = pattern.test(imageUrl) ? imageUrl : `https://${imageUrl}`;

    return imageUrl;
  } catch (error) {
    console.error(error);
    return '';
  }
}
