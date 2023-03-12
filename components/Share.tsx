import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';

const Share = ({ comicId }: any) => {
  const router = useRouter();
  const shareOnSocialMedia = (socialMedia: string) => {
    const isSingle = window.location.href.split('/').includes('search');
    const url = isSingle
      ? window.location.href
      : comicId
      ? `${window.location.href}/${comicId}`
      : window.location.href;

    switch (socialMedia) {
      case 'fb':
        const facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=';
        router.push(facebookUrl + url);
        break;
      case 'tweet':
        const tweetUrl = 'http://twitter.com/intent/tweet/?url=';
        router.push(tweetUrl + url);
        break;
      case 'instagram':
        const instagramUrl = 'https://www.instagram.com/create/story';
        router.push(instagramUrl + url);
        break;
      default:
        try {
          copy(url);
          alert('Copied the Url to clipboard!');
        } catch (err) {
          alert('Not working in development mode');
        }
        break;
    }
  };
  return (
    <div className="share-container">
      <div className="flex flex-col items-center">
        <div className="share-links">
          <div>
            <Image
              width={60}
              height={60}
              alt="copy-link"
              src="/img/icons/icons_copy_link.svg"
              onClick={() => shareOnSocialMedia('')}
            />
          </div>
          <div>
            <Image
              width={60}
              height={60}
              alt="facebook-share"
              src="/img/icons/icons_facebook.svg"
              onClick={() => shareOnSocialMedia('fb')}
            />
          </div>
          <div>
            <Image
              width={60}
              height={60}
              alt="instagram-share"
              src="/img/icons/icons_instagram.svg"
              onClick={() => shareOnSocialMedia('instagram')}
            />
          </div>
          <div>
            <Image
              width={60}
              height={60}
              alt="twitter-share"
              src="/img/icons/icons_twitter.svg"
              onClick={() => shareOnSocialMedia('tweet')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
