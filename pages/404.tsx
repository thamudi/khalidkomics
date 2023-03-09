import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { fetchAPI } from '@/lib/api';

export default function Home({ comicSeo }: any) {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        {comicSeo?.attributes && <Seo seo={comicSeo.attributes.seo} />}
        <h1>Oh oh not found! 404</h1>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }: any) {
  // Run API calls in parallel

  const [comicSeoResponse] = await Promise.all([
    fetchAPI('/seo', {
      populate: 'deep',
    }),
  ]);

  // const limit = jsonResponse.config.params._limit;
  // const start = jsonResponse.config.params._start;
  // const page = Math.floor(start / limit) + 1;
  // console.log('page: ', page);

  return {
    props: {
      comicSeo: comicSeoResponse.data,
    },
  };
}
