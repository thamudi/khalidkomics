import { getStrapiMedia } from '@/lib/media';
import React from 'react';
import Image from 'next/image';
import { ComicNav } from './ComicNav';

const Comic = ({ comicData, fetchComic }: any) => {
  const comic = comicData.data[0].attributes;
  const comicMeta = comicData.meta.pagination;
  const image = getStrapiMedia({ data: comic.comic.data[0] });

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="pb-2">{comic.title}</h1>
      <ComicNav comicMetaData={comicMeta} fetchComic={fetchComic} />
      <Image width={1000} height={600} alt={comic.slug} src={image} />
      <ComicNav comicMetaData={comicMeta} fetchComic={fetchComic} />
    </div>
  );
};

export default Comic;
