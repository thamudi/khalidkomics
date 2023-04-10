import { ComicNavProps } from '@/interfaces/comic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const ComicNav = ({ comicMetaData, fetchComic }: ComicNavProps) => {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<string | undefined>(
    router.locale
  );
  return (
    <div className="comicNav">
      {comicMetaData.page < comicMetaData.pageCount && (
        <>
          <div>
            <Image
              width={190}
              height={500}
              alt={'nav_previous'}
              src={`/img/icons/icons_arrow_previous_${currentLocale}.svg`}
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
              src={`/img/icons/icons_arrow_next_${currentLocale}.svg`}
              onClick={() => fetchComic(comicMetaData.page - 1)}
            />
          </div>
        </>
      )}
    </div>
  );
};
