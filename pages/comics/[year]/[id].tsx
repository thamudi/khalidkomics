import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { fetchAPI, fetchAPIUrl } from '@/lib/api';
import { default as ComicComponent } from '@/components/Comic';
import { useState } from 'react';
import { ComicProp } from '@/interfaces/comic';

const Comic = ({ comicSeo, comicData, year }: any) => {
  const [comic, setComic] = useState<ComicProp>(comicData);
  const [isLoading, setLoading] = useState<boolean>(false);

  /**
   * A function that fetches the next comic when invoked
   *
   * @param pageNumber By default it gets the first page
   */
  const fetchComic = async (
    pageNumber: number = comic.meta.pagination.page
  ) => {
    // set the loader
    setLoading(true);
    const responseData = await fetchAPI('/comics', {
      populate: '*',
      'sort[0]': 'releaseDate:desc',
      'pagination[pageSize]': 1,
      'pagination[page]': pageNumber,
      'filters[archive][slug][$eq]': year,
    });
    setComic(responseData);
    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        {comicSeo?.attributes && <Seo seo={comicSeo.attributes.seo} />}
        {isLoading ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          <>
            {comic?.data && (
              <ComicComponent comicData={comic} fetchComic={fetchComic} />
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
  const comics = await fetchAPI(`/comics`, {
    populate: '*',
  });

  // create an object of params Ids
  const paths = comics.data.map((comic: any) => ({
    params: {
      id: comic.id.toString(),
      year: comic.attributes.archive.data.attributes.slug,
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
export async function getStaticProps(context: any) {
  // Run API calls in parallel
  const { id, year } = context.params;
  const [comicSeoResponse, comicResponse] = await Promise.all([
    fetchAPI('/seo', {
      populate: 'deep',
    }),
    fetchAPI(`/comics/${id}`, {
      populate: '*',
      'filters[archive][slug][$eq]': year,
    }),
  ]);
  return {
    props: {
      comicSeo: comicSeoResponse.data,
      comicData: comicResponse,
      year: year,
    },
  };
}

export default Comic;
