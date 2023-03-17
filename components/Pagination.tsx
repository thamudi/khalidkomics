import { ComicNavProps } from '@/interfaces/comic';
import React from 'react';

const Pagination = ({ comicMetaData, fetchComic }: ComicNavProps) => {
  const pageNumbers: number[] = [];

  for (let index = 1; index <= comicMetaData.pageCount; index++) {
    pageNumbers.push(index);
  }

  return (
    <div className="flex flex-row-reverse gap-x-4">
      {pageNumbers.map((page, i) => (
        <span
          className={`text-lg text-gray-400 cursor-pointer hover:text-link-blue ${
            page === comicMetaData.page &&
            'bg-link-blue px-2 rounded-lg text-white hover:text-gray-500'
          }`}
          key={i}
          onClick={() => fetchComic(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
