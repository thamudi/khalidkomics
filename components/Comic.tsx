import { getStrapiMedia } from '@/lib/media';
import React from 'react';
import { ComicNav } from './ComicNav';
import Share from './Share';
import Media from './Media';
import ComicFootnote from './ComicFootnote';
import Slider from './Slider';
import Search from './Search';

const Comic = ({ comicData, fetchComic }: any) => {
  const comic = comicData.data
    ? comicData.data[0].attributes
    : comicData.attributes;
  const comicMeta = comicData.meta?.pagination;
  const images = comic.comic.data.map((comicImage: any) => {
    return getStrapiMedia({ data: comicImage });
  });
  return (
    <div className="flex flex-col items-center">
      <h1 className="pb-2">{comic.title}</h1>
      <Search />
      {images.length > 1 ? (
        <Slider images={images} />
      ) : (
        <>
          {images.map((image: string, i: number) => (
            <Media
              key={i}
              media={image}
              title={comic.title}
              width={500}
              height={600}
            />
          ))}
        </>
      )}
      {comicMeta && (
        <ComicNav
          comicMetaData={comicMeta}
          fetchComic={fetchComic}
          search={false}
        />
      )}
      {comic.authorsNote?.length && (
        <ComicFootnote authorsNote={comic.authorsNote} />
      )}
      <Share comicId={comicMeta ? comicData.data[0].id : null} />
    </div>
  );
};

export default Comic;
