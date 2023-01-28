import { getStrapiURL } from './api';

export function getStrapiMedia(media: any) {
  const { url } = media.data.attributes;
  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
  return imageUrl;
}

export function getStrapiThumbnailMedia(media: any) {
  const { url } = media.formats.thumbnail;
  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
  return imageUrl;
}
