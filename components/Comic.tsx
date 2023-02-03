import { getStrapiMedia } from '@/lib/media';
import React from 'react';
import { ComicNav } from './ComicNav';
import Share from './Share';
import Media from './Media';
import ComicFootnote from './ComicFootnote';

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
      <Media media={image} title={comic.title} width={500} height={600} />
      {comic.authorsNote?.length && (
        <ComicFootnote authorsNote={comic.authorsNote} />
      )}
      <Share comicId={comicMeta ? comicData.data[0].id : null} />
    </div>
  );
};

export default Comic;
