import Layout from '@/components/Layout';
import Media from '@/components/Media';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import Seo from '@/components/Seo';
import Sorting from '@/components/Sorting';
import { fetchAPI } from '@/lib/api';
import { formatDate } from '@/utils/dateFormatter';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

const ArchiveList = ({
  archivesSeo,
  serverComics,
  slug,
  serverComicMeta,
  localeProps,
}: any) => {
  const [comics, setComics] = useState(serverComics);
  const [comicMeta, setComicMeta] = useState(serverComicMeta);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [sort, setSort] = useState<string>('desc');
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const { t } = useTranslation('common');

  const fetchComic = async (
    pageNumber: number = page,
    sortValue: string = sort
  ) => {
    // set the loader
    setLoading(true);
    setPage(pageNumber);
    setSort(sortValue);
    const responseData = await fetchAPI('/comics', {
      populate: '*',
      'sort[0]': `releaseDate:${sortValue}`,
      'filters[archive][slug][$eq]': slug,
      'pagination[pageSize]': 5,
      'pagination[page]': pageNumber,
      locale: localeProps,
    });
    setComics(responseData.data);
    setComicMeta(responseData.meta?.pagination);
    setLoading(false);
  };

  useEffect(() => {
    comics.length === 0 && router.push('/404');
  }, []);

  return (
    <Layout>
      {archivesSeo?.attributes && <Seo seo={archivesSeo.attributes.seo} />}
      <div className="flex flex-col items-center w-full">
        <h1 className="text-center font-bold mt-4">
          Archive {'>'} {slug}
        </h1>
        <Search placeholderText={`Search for comics in ${slug}`} />
        <Sorting fetchComic={fetchComic} />
        {isLoading ? (
          <>
            <p>{t('loading')}</p>
          </>
        ) : (
          <>
            <div className="comics-list-container">
              {comics.length &&
                comics.map((comic: any) => {
                  return (
                    <Link
                      href={`/comics/${comic.attributes.archive.data.attributes.slug}/${comic.id}`}
                      className="flex items-center m-4 p-4"
                      key={comic.id}
                    >
                      <Media
                        media={comic.attributes.thumbnail}
                        title={comic.attributes.title}
                        width={100}
                        height={100}
                        className={'thumbnail'}
                      />
                      <div className="block">
                        <h3 className="font-bold">{comic.attributes.title}</h3>
                        <p className="text-gray-400">
                          {formatDate(comic.attributes.releaseDate)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
            </div>
            {comicMeta && (
              <Pagination comicMetaData={comicMeta} fetchComic={fetchComic} />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

///
// Get static paths for the pages to render
///
export async function getStaticPaths({ locales }: any) {
  // fetch the endpoint all data
  const archives = await fetchAPI(`/archives`, {
    populate: 'deep',
  });
  const paths = archives.data
    .map((archive: any) =>
      locales.map((locale: string) => ({
        params: { slug: archive.attributes.slug },
        locale, // Pass locale here
      }))
    )
    .flat(); // Flatten array to avoid nested arrays
  return {
    paths,
    // fallback false means other routes should be 404
    fallback: false,
  };
}

///
// Get static props from API
///
export async function getStaticProps({ params, query, locale }: any) {
  const { page } = query ? query : '';
  // Run API calls in parallel
  const [archivesSeoResponse, archivesResponse] = await Promise.all([
    fetchAPI('/seo', {
      populate: 'deep',
    }),
    fetchAPI(`/comics/`, {
      populate: 'deep',
      'filters[archive][slug][$eq]': params.slug,
      'sort[0]': 'releaseDate:desc',
      'pagination[pageSize]': 5,
      'pagination[page]': page ? page : 1,
      locale: locale,
    }),
  ]);

  return {
    props: {
      archivesSeo: archivesSeoResponse.data,
      serverComics: archivesResponse.data,
      serverComicMeta: archivesResponse.meta?.pagination,
      slug: params.slug,
      localeProps: locale,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default ArchiveList;
