import { ComicNav } from '@/components/ComicNav';
import Layout from '@/components/Layout';
import Media from '@/components/Media';
import { ComicMeta } from '@/interfaces/comic';
import { fetchAPIUrl } from '@/lib/api';
import { LinkCreator } from '@/lib/LinkCreator';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SearchComponent from '@/components/Search';
interface props {
  comics: any;
  search: string;
  comicMeta: ComicMeta;
}

const Search = ({ comics, search, comicMeta }: props) => {
  const router = useRouter();

  const fetchComic = (page: number) => {
    router.push(
      LinkCreator.toQuery({ q: search, page: page }, '/archive/search')
    );
  };

  return (
    <Layout>
      <div className="subPage">
        {/* {archivesSeo?.attributes && <Seo seo={archivesSeo.attributes.seo} />} */}
        <div className="flex flex-col items-center my-4">
          <h1 className="text-center font-bold mt-4">Archive</h1>
          <SearchComponent />
          <h2 className="font-bold">Search Results</h2>
          <div>
            {comics.length
              ? comics.map((comic: any) => {
                  return (
                    <Link
                      href={`/comics/${comic.id}`}
                      className="flex items-center my-4 outline p-4"
                      key={comic.id}
                    >
                      <Media
                        media={comic.attributes.thumbnail}
                        title={comic.attributes.title}
                        width={100}
                        height={100}
                        className={'thumbnail'}
                      />
                      <h3>{comic.attributes.title}</h3>
                    </Link>
                  );
                })
              : 'No Result found'}
          </div>
          <div>
            {comicMeta && comicMeta.pageCount > 1 && (
              <ComicNav
                comicMetaData={comicMeta}
                fetchComic={fetchComic}
                search={true}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const { q, page } = context.query;

  // Fetch data from external API
  const res = await fetch(
    fetchAPIUrl(`/comics/`, {
      populate: 'deep',
      'filters[keywords][$contains]': q,
      'pagination[pageSize]': 5,
      'pagination[page]': page,
    })
  );
  const data = await res.json();
  console.log('search: ', data);

  // Pass data to the page via props
  return {
    props: {
      comics: data.data,
      search: q,
      comicMeta: data.meta?.pagination,
    },
  };
}

export default Search;
