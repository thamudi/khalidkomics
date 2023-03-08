import { getStrapiURL } from './api';

export function getStrapiMedia(media: any) {
  try {
    const { url } = media.data.attributes ? media.data.attributes : media.data;
    const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
    return imageUrl;
  } catch (error) {
    console.error(error);
    return '';
  }
}
