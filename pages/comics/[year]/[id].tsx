import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { fetchAPI } from '@/lib/api';
import { default as ComicComponent } from '@/components/Comic';
import { useState } from 'react';
import { ComicProp } from '@/interfaces/comic';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import mail from '@/lib/mail';
import Loader from '@/components/Loader';

const Comic = ({ comicSeo, comicData, year, locale }: any) => {
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
      locale: locale,
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
            <Loader />
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
export async function getStaticPaths({ locales }: any) {
  // fetch the endpoint all data
  let allComics: any = [];
  let page = 1;
  let hasMore = true;

  /**
   * This while loop is used to get all the comics "posts" from strapi's api since strapi only returns a maximum of 100 post per page.
   * So it will loop until it hits a dead end.
   */
  while (hasMore) {
    // fetch the data from the api endpoint
    const comics = await fetchAPI(`/comics`, {
      populate: '*',
      'pagination[page]': page,
      'pagination[pageSize]': 100,
      locale: 'all',
    });

    // check if the response is empty
    if (comics.data.length === 0) {
      hasMore = false;
      // end while loop
      break;
    } else {
      const filteredComics = comics.data.filter((comic: any) => {
        if (comic.attributes.archive.data) {
          return true;
        } else {
          console.error(`The following Comic is corrupted: ${comic.id}`);
          mail(comic.id);
          return false;
        }
      });

      allComics = [...allComics, ...filteredComics];
      page++;
    }
  }

  const paths = allComics
    .map((comic: any) =>
      locales.map((locale: string) => ({
        params: {
          id: comic.id.toString(),
          year: comic.attributes.archive.data.attributes.slug,
        },
        locale,
      }))
    )
    .flat(); // Flatten array to avoid nested arrays

  return {
    paths,
    // fallback false means other routes should be 404
    fallback: true,
  };
}

///
// Get static props from API
///
export async function getStaticProps(context: any) {
  // Run API calls in parallel
  const { id, year } = context.params;
  const { locale } = context;

  const [comicSeoResponse, comicResponse] = await Promise.all([
    fetchAPI('/seo', {
      populate: 'deep',
    }),
    fetchAPI(`/comics/${id}`, {
      populate: '*',
      'filters[archive][slug][$eq]': year,
      locale: 'all',
    }),
  ]);
  return {
    props: {
      comicSeo: comicSeoResponse.data,
      comicData: comicResponse,
      year: year,
      locale: locale,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Comic;
