import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SortingProps {
  fetchComic: (pageNumber: number, sort: string) => void;
}

const Sorting = ({ fetchComic }: SortingProps) => {
  const [sortIcon, setSortIcon] = useState({
    src: 'sort_descending',
    value: 'desc',
  });

  const sortData = () => {
    if (sortIcon.value === 'desc') {
      setSortIcon({
        src: 'sort_ascending',
        value: 'asc',
      });
    } else {
      setSortIcon({
        src: 'sort_descending',
        value: 'desc',
      });
    }
  };

  useEffect(() => {
    fetchComic(1, sortIcon.value);
  }, [sortIcon]);

  return (
    <div className="w-full mx-4 flex flex-row-reverse">
      <Image
        src={`/img/icons/${sortIcon.src}.svg`}
        alt={''}
        width={30}
        height={30}
        className="mx-8 cursor-pointer"
        onClick={() => sortData()}
      />
    </div>
  );
};

export default Sorting;
