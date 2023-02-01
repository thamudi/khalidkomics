import { getStrapiMedia } from '@/lib/media';
import Image from 'next/image';

const Media = ({ media, title, width, height, className }: any) => {
  const mediaUrl = media.data ? getStrapiMedia(media) : media;
  const imageFormats = ['jpg', 'png', 'gif', 'jpeg'];
  const mediaFormat = mediaUrl.split('.')[mediaUrl.split('.').length - 1];

  return imageFormats.includes(mediaFormat) ? (
    <Image
      src={mediaUrl}
      alt={title}
      width={width}
      height={height}
      className={className}
    />
  ) : (
    <video autoPlay loop style={{ width: '500px', height: '500px' }}>
      <source src={mediaUrl} />
    </video>
  );
};

export default Media;
