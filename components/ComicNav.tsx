import { ComicMeta } from '@/interfaces/comic';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface ComicNavProps {
  comicMetaData: ComicMeta;
  fetchComic: (pageNumber: number) => void;
  search: boolean;
}

export const ComicNav = ({
  comicMetaData,
  fetchComic,
  search = false,
}: ComicNavProps) => {
  const [page, setPage] = useState(comicMetaData.page);
  // Set the value of the state if it should display the final page based on page count or the total property
  const [finalPage, setFinalPage] = useState(
    search ? comicMetaData.pageCount : comicMetaData.total
  );

  return (
    <div className="comicNav">
      {comicMetaData.page < finalPage && (
        <>
          <div>
            <Image
              width={90}
              height={500}
              alt={'nav_first'}
              src="/img/icons/icons_arrow_first.svg"
              onClick={() => fetchComic(finalPage)}
            />
          </div>
          <div>
            <Image
              width={90}
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
              width={90}
              height={500}
              alt={'nav_next'}
              src="/img/icons/icons_arrow_next.svg"
              onClick={() => fetchComic(comicMetaData.page - 1)}
            />
          </div>
          <div>
            <Image
              width={90}
              height={500}
              alt={'nav_last'}
              src="/img/icons/icons_arrow_last.svg"
              onClick={() => fetchComic(finalPage - (finalPage - 1))}
            />
          </div>
        </>
      )}
    </div>
  );
};
