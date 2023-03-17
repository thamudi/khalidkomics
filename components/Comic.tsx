import { getStrapiMedia } from '@/lib/media';
import React from 'react';
import { ComicNav } from './ComicNav';
import Share from './Share';
import Media from './Media';
import ComicFootnote from './ComicFootnote';
import Slider from './Slider';
import Search from './Search';
import { formatDate } from '@/utils/dateFormatter';

const Comic = ({ comicData, fetchComic }: any) => {
  const comic = comicData.data[0]
    ? comicData.data[0].attributes
    : comicData.data.attributes;
  const comicImage = comic.comic.data ? comic.comic.data : comic.comic;
  const comicMeta = comicData.meta?.pagination;
  const images = comicImage.map((comicImage: any) => {
    return getStrapiMedia({ data: comicImage });
  });
  return (
    <div className="flex flex-col items-center w-full">
      <Search />
      <div className="flex justify-between md:justify-center items-center w-full px-8">
        <h1 className="pb-2">{comic.title}</h1>
        <div className="md:mx-8"></div>
        <p>{formatDate(comic.releaseDate)}</p>
      </div>
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
        <ComicNav comicMetaData={comicMeta} fetchComic={fetchComic} />
      )}
      {comic.authorsNote?.length && (
        <ComicFootnote authorsNote={comic.authorsNote} />
      )}
      <Share comicId={comicMeta ? `${comic.archive.slug}/${comic.id}` : null} />
    </div>
  );
};

export default Comic;
