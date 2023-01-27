import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { fetchAPI, fetchAPIUrl } from '@/lib/api';
import { useContext, useEffect, useState } from 'react';
import Comic from '@/components/Comic';

interface ComicData {
  data: any;
  meta: any;
}

const Comics = ({ comicSeo }: any) => {
  const [comics, setComic] = useState<ComicData>();
  const [isLoading, setLoading] = useState<boolean>(false);

  //TODO: Check if SWR is a better fit
  const fetchComic = (pageNumber: number = 1) => {
    setLoading(true);
    fetch(
      fetchAPIUrl('/comics', {
        populate: '*',
        'filters[archive][slug][$eq]': new Date().getFullYear() - 1,
        'pagination[pageSize]': 1,
        'pagination[page]': pageNumber,
      })
    )
      .then((res) => res.json())
      .then((data) => {
        setComic(data);
        setLoading(false);
      });
  };

  useEffect(() => {
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
