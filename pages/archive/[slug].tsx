import { ComicNav } from '@/components/ComicNav';
import Layout from '@/components/Layout';
import Media from '@/components/Media';
import Search from '@/components/Search';
import Seo from '@/components/Seo';
import Image from 'next/image';
import { fetchAPI, fetchAPIUrl } from '@/lib/api';
import { formatDate } from '@/utils/dateFormatter';
import Link from 'next/link';
import { useState } from 'react';

const ArchiveList = ({
  archivesSeo,
  serverComics,
  slug,
  serverComicMeta,
}: any) => {
  const [comics, setComics] = useState(serverComics);
  const [comicMeta, setComicMeta] = useState(serverComicMeta);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [sortIcon, setSortIcon] = useState({
    src: 'sort_descending',
    value: 'desc',
  });
  const fetchComic = (pageNumber: number = 1, sortClicked: boolean = false) => {
    if (sortClicked) {
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
    }
    setLoading(true);

    fetch(
      fetchAPIUrl('/comics', {
        populate: '*',
        'sort[0]': `releaseDate:${sortIcon.value}`,
        'filters[archive][slug][$eq]': slug,
        'pagination[pageSize]': 5,
        'pagination[page]': pageNumber,
      })
    )
      .then((res) => res.json())
      .then((data) => {
        setComics(data.data);
        setComicMeta(data.meta?.pagination);
        setLoading(false);
      });
  };

  return (
    <Layout>
      {archivesSeo?.attributes && <Seo seo={archivesSeo.attributes.seo} />}
      <div className="flex flex-col items-center w-full">
        <h1 className="text-center font-bold mt-4">
          Archive {'>'} {slug}
        </h1>
        <Search placeholderText={`Search for comics in ${slug}`} />
        {isLoading ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          <>
            {/* TODO: Fix the issue with the delay in setting the state of the comics */}
            {/* <div className="w-full mx-4 flex flex-row-reverse">
              <Image
                src={`/img/icons/${sortIcon.src}.svg`}
                alt={''}
                width={30}
                height={30}
                className="mx-8 cursor-pointer"
                onClick={() => fetchComic(1, true)}
              />
            </div> */}
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
            {comicMeta && comicMeta.pageCount > 1 && (
              <ComicNav
                comicMetaData={comicMeta}
                fetchComic={fetchComic}
                search={true}
              />
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
export async function getStaticPaths() {
  // fetch the endpoint all data
  const res = await fetch(
    fetchAPIUrl(`/archives`, {
      populate: 'deep',
    })
  );
  //format the data as a json object
  const archives = await res.json();

  // create an object of params Ids
  const paths = archives.data.map((archive: any) => ({
    params: {
      slug: archive.attributes.slug,
    },
  }));

  return {
    paths,
    // fallback false means other routes should be 404
    fallback: false,
  };
}

///
// Get static props from API
///
export async function getStaticProps({ params, query }: any) {
  const { page } = query ? query : '';
  // Run API calls in parallel
  const [archivesSeoResponse, archivesResponse] = await Promise.all([
    fetchAPI('/seo', {
      populate: 'deep',
    }),
    fetch(
      fetchAPIUrl(`/comics/`, {
        populate: 'deep',
        'filters[archive][slug][$eq]': params.slug,
        'sort[0]': 'releaseDate:desc',
        'pagination[pageSize]': 5,
        'pagination[page]': page ? page : 1,
      })
    ),
  ]);

  const archivesJson = await archivesResponse.json();

  return {
    props: {
      archivesSeo: archivesSeoResponse.data,
      serverComics: archivesJson.data,
      serverComicMeta: archivesJson.meta?.pagination,
      slug: params.slug,
    },
  };
}

export default ArchiveList;
