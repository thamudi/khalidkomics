import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const ComicNav = ({ comicMetaData }: any) => {
  return (
    <div className="comicNav">
      <div>
        <Image
          width={90}
          height={500}
          alt={'nav_first'}
          src="/img/icons/icons_arrow_previous.svg"
        />
      </div>
      <div>
        <Image
          width={90}
          height={500}
          alt={'nav_previous'}
          src="/img/icons/icons_arrow_previous.svg"
        />
      </div>
      <div>
        <Image
          width={90}
          height={500}
          alt={'nav_next'}
          src="/img/icons/icons_arrow_next.svg"
        />
      </div>
      <div>
        <Image
          width={90}
          height={500}
          alt={'nav_last'}
          src="/img/icons/icons_arrow_next.svg"
        />
      </div>
    </div>
  );
};
