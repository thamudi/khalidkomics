import { ComicNav } from '@/components/ComicNav';
import Layout from '@/components/Layout';
import Media from '@/components/Media';
import { ComicMeta, SearchProps } from '@/interfaces/comic';
import { fetchAPI } from '@/lib/api';
import { LinkCreator } from '@/lib/LinkCreator';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchComponent from '@/components/Search';
import { formatDate } from '@/utils/dateFormatter';
import Sorting from '@/components/Sorting';
import Pagination from '@/components/Pagination';

const Search = ({ comicsData, search, comicMeta }: SearchProps) => {
  const router = useRouter();

  const fetchComic = (page: number, sort: string = 'desc') => {
    router.push(
      LinkCreator.toQuery(
        { q: search, page: page, sort: sort },
        '/archive/search'
      )
    );
  };

  return (
    <Layout>
      {/* {archivesSeo?.attributes && <Seo seo={archivesSeo.attributes.seo} />} */}
      <div className="flex flex-col items-center w-full">
        <h1 className="text-center font-bold mt-4">Archive</h1>
        <SearchComponent />
        <Sorting fetchComic={fetchComic} />
        <h2 className="font-bold mx-8">Search Results for {search}</h2>
        <div className="comics-list-container">
          {comicsData.length
            ? comicsData.map((comic: any) => {
                return (
                  <Link
                    href={`/archive/search/single?id=${comic.id}&q=${search}`}
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
                      <h3>{comic.attributes.title}</h3>
                      <p className="text-gray-400">
                        {formatDate(comic.attributes.releaseDate)}
                      </p>
                    </div>
                  </Link>
                );
              })
            : 'No Result found'}
        </div>
        <div>
          {comicMeta && (
            <Pagination comicMetaData={comicMeta} fetchComic={fetchComic} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const { q, page } = context.query;
  let { sort } = context.query;
  const { locale } = context;
  sort ? (sort = sort) : (sort = 'desc');

  // Fetch data from external API
  const data = await fetchAPI(`/comics/`, {
    populate: 'deep',
    'sort[0]': sort ? `releaseDate:${sort}` : 'releaseDate:desc',
    'filters[keywords][$contains]': q,
    'pagination[pageSize]': 5,
    'pagination[page]': page,
    locale: locale,
  });

  // Pass data to the page via props
  return {
    props: {
      comicsData: data.data,
      search: q,
      comicMeta: data.meta?.pagination,
    },
  };
}

export default Search;
