import { ComicNavProps } from '@/interfaces/comic';
import Image from 'next/image';

export const ComicNav = ({ comicMetaData, fetchComic }: ComicNavProps) => {
  return (
    <div className="comicNav">
      {comicMetaData.page < comicMetaData.pageCount && (
        <>
          <div>
            <Image
              width={190}
              height={500}
              alt={'nav_previous'}
              src="/img/icons/icons_arrow_previous.svg"
              onClick={() => fetchComic(comicMetaData.page + 1)}
            />
          </div>
        </>
      )}
      {comicMetaData.page !== 1 && (
        <>
          <div>
            <Image
              width={190}
              height={500}
              alt={'nav_next'}
              src="/img/icons/icons_arrow_next.svg"
              onClick={() => fetchComic(comicMetaData.page - 1)}
            />
          </div>
        </>
      )}
    </div>
  );
};
