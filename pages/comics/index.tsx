import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { fetchAPI } from '@/lib/api';
import { useEffect, useState } from 'react';
import Comic from '@/components/Comic';
import { ComicProp } from '@/interfaces/comic';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Loader from '@/components/Loader';

const Comics = ({ comicSeo, localeProp }: any) => {
  const [comics, setComic] = useState<ComicProp>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [locale, setLocale] = useState<string | undefined>(localeProp);
  const router = useRouter();
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

  useEffect(() => {
    !comics?.data || (comics?.data.length === 0 && router.push('/404'));
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center">
        {comicSeo?.attributes && <Seo seo={comicSeo.attributes.seo} />}
        {isLoading ? (
          <Loader />
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

export async function getStaticProps({ locale }: any) {
  // Run API calls in parallel
  const [comicSeoResponse] = await Promise.all([
    fetchAPI('/seo', {
      populate: ['deep'],
    }),
  ]);

  return {
    props: {
      comicSeo: comicSeoResponse.data,
      localeProp: locale,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}
export default Comics;
