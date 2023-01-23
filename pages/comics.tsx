import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { fetchAPI } from '@/lib/api';
import { useState } from 'react';
import Comic from '@/components/Comic';
import { ComicNav } from '@/components/ComicNav';

const Comics = ({ comicSeo, comics }: any) => {
  // const [current, setCurrent] = useState(comics.length() - 1);
  // const [previous, setPrevious] = useState(comics.length() - 2);
  // const [next, setNext] = useState();
  console.log(comics.meta.total);

  return (
    <Layout>
      <div className="flex flex-col items-center">
        {comics?.meta.pagination.total && (
          <ComicNav comicMetaData={comics.meta} />
        )}
        {comicSeo?.attributes && <Seo seo={comicSeo.attributes.seo} />}
        {comics?.data.length && <Comic comicData={comics.data[0]} />}
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [comicSeoResponse, comicsResponse] = await Promise.all([
    fetchAPI('/seo', {
      populate: ['seo', 'seo.metaImage', 'seo.metaSocial'],
    }),
    fetchAPI('/comics', {
      populate: '*',
      'filters[archive][slug][$eq]': new Date().getFullYear() - 1,
      'pagination[pageSize]': 1,
      'pagination[page]': 1,
    }),
  ]);

  return {
    props: {
      comicSeo: comicSeoResponse.data,
      comics: comicsResponse,
    },
  };
}
export default Comics;
