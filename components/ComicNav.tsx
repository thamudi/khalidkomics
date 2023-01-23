import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface ComicNavProps {
  comicMetaData: any;
  fetchComic: (pageNumber: number) => void;
}

export const ComicNav = ({ comicMetaData, fetchComic }: ComicNavProps) => {
  const [page, setPage] = useState(comicMetaData.page);
  const [total, setTotal] = useState(comicMetaData.total);

  return (
    <div className="comicNav">
      {page < total && (
        <>
          <div>
            <Image
              width={90}
              height={500}
              alt={'nav_first'}
              src="/img/icons/icons_arrow_first.svg"
              onClick={() => fetchComic(total)}
            />
          </div>
          <div>
            <Image
              width={90}
              height={500}
              alt={'nav_previous'}
              src="/img/icons/icons_arrow_previous.svg"
              onClick={() => fetchComic(page + 1)}
            />
          </div>
        </>
      )}
      {page !== 1 && (
        <>
          <div>
            <Image
              width={90}
              height={500}
              alt={'nav_next'}
              src="/img/icons/icons_arrow_next.svg"
              onClick={() => fetchComic(page - 1)}
            />
          </div>
          <div>
            <Image
              width={90}
              height={500}
              alt={'nav_last'}
              src="/img/icons/icons_arrow_last.svg"
              onClick={() => fetchComic(total - (total - 1))}
            />
          </div>
        </>
      )}
    </div>
  );
};
