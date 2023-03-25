import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { fetchAPI } from '@/lib/api';
import { useEffect, useState } from 'react';
import Comic from '@/components/Comic';
import { ComicProp } from '@/interfaces/comic';
import { getCookie } from 'cookies-next';

const Comics = ({ comicSeo }: any) => {
  const [comics, setComic] = useState<ComicProp>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [locale, setLocale] = useState<string | undefined>('en');

  /**
   * A function that fetches the next comic when invoked
   *
   * @param pageNumber By default it gets the first page
   */
  const fetchComic = async (pageNumber: number = 1) => {
    // set the loader
    setLoading(true);
    const responseData = await fetchAPI('/comics', {
      populate: '*',
      'sort[0]': 'releaseDate:desc',
      'pagination[pageSize]': 1,
      'pagination[page]': pageNumber,
      locale: locale,
    });
    setComic(responseData);
    setLoading(false);
  };

  // Observable that fetches the comic on page load
  useEffect(() => {
    getCookie('NEXT_LOCALE') && setLocale(getCookie('NEXT_LOCALE')?.toString());
    fetchComic();
  }, []);

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
            {comics?.data.length && (
              <Comic comicData={comics} fetchComic={fetchComic} />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [comicSeoResponse] = await Promise.all([
    fetchAPI('/seo', {
      populate: ['deep'],
    }),
  ]);

  return {
    props: {
      comicSeo: comicSeoResponse.data,
    },
  };
}
export default Comics;
