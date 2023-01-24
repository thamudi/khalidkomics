import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Share = ({ comic }: any) => {
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
            />
          </div>
          <div>
            <Image
              width={60}
              height={60}
              alt="facebook-share"
              src="/img/icons/icons_facebook.svg"
            />
          </div>
          <div>
            <Image
              width={60}
              height={60}
              alt="instagram-share"
              src="/img/icons/icons_instagram.svg"
            />
          </div>
          <div>
            <Image
              width={60}
              height={60}
              alt="twitter-share"
              src="/img/icons/icons_twitter.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
