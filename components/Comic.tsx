import { getStrapiMedia } from '@/lib/media';
import React from 'react';
import Image from 'next/image';
import { ComicNav } from './ComicNav';
import Share from './Share';

const Comic = ({ comicData, fetchComic }: any) => {
  const comic = comicData.data
    ? comicData.data[0].attributes
    : comicData.attributes;
  const comicMeta = comicData.meta?.pagination;
  const image = getStrapiMedia({ data: comic.comic.data[0] });

  return (
    <div className="flex flex-col items-center">
      <h1 className="pb-2">{comic.title}</h1>
      {comicMeta && (
        <ComicNav comicMetaData={comicMeta} fetchComic={fetchComic} />
      )}
      <Image width={500} height={600} alt={comic.slug} src={image} />

      {comicMeta && (
        <ComicNav comicMetaData={comicMeta} fetchComic={fetchComic} />
      )}
      <Share comic={comic.data} />
    </div>
  );
};

export default Comic;
