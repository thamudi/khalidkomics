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
  const fetchComic = (
    pageNumber: number = 1,
    previousYear: boolean = false,
    numberOfYears: number = 0
  ) => {
    setLoading(true);
    fetch(
      fetchAPIUrl('/comics', {
        populate: '*',
        'sort[0]': 'releaseDate:desc',
        'filters[archive][slug][$eq]': previousYear
          ? new Date().getFullYear() - numberOfYears
          : new Date().getFullYear(),
        'pagination[pageSize]': 1,
        'pagination[page]': pageNumber,
      })
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data.length) {
          setComic(data);
          setLoading(false);
        } else {
          fetchComic(pageNumber, true, numberOfYears + 1);
        }
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
