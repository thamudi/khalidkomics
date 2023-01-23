import { getStrapiMedia } from '@/lib/media';
import React from 'react';
import Image from 'next/image';

const Comic = ({ comicData }: any) => {
  const image = getStrapiMedia({ data: comicData.attributes.comic.data[0] });

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="pb-2">{comicData.attributes.title}</h1>
      <Image
        width={1000}
        height={600}
        alt={comicData.attributes.slug}
        src={image}
      />
    </div>
  );
};

export default Comic;
