import { getStrapiMedia } from '@/lib/media';
import Image from 'next/image';
import { useRef } from 'react';

const Media = ({ media, title, width, height, className }: any) => {
  const mediaUrl = media.data ? getStrapiMedia(media) : media;
  const imageFormats = ['jpg', 'png', 'gif', 'jpeg'];
  const mediaFormat = mediaUrl.split('.')[mediaUrl.split('.').length - 1];

  const refVideo: any = useRef(null);

  const unmute = () => {
    refVideo.current.defaultMuted = !refVideo.current.defaultMuted;
    refVideo.current.muted = !refVideo.current.muted;
  };
  return imageFormats.includes(mediaFormat) ? (
    <Image
      src={mediaUrl}
      alt={title}
      width={width}
      height={height}
      className={className}
    />
  ) : (
    <video
      ref={refVideo}
      loop
      autoPlay
      muted
      onClick={unmute}
      className="mb-4 cursor-pointer"
      style={{ width: '500px', height: '500px' }}
    >
      <source src={mediaUrl} />
    </video>
  );
};

export default Media;
