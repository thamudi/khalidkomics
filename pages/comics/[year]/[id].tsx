import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { fetchAPI, fetchAPIUrl } from '@/lib/api';
import { default as ComicComponent } from '@/components/Comic';

const Comic = ({ comicSeo, comic }: any) => {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        {comicSeo?.attributes && <Seo seo={comicSeo.attributes.seo} />}
        <>{comic?.attributes && <ComicComponent comicData={comic} />}</>
      </div>
    </Layout>
  );
};

///
// Get static paths for the pages to render
///
export async function getStaticPaths() {
  // fetch the endpoint all data
  const res = await fetch(
    fetchAPIUrl(`/comics`, {
      populate: '*',
    })
  );
  //format the data as a json object
  const comics = await res.json();

  // create an object of params Ids
  const paths = comics.data.map((comic: any) => ({
    params: {
      // slug: {
      id: comic.id.toString(),
      year: comic.attributes.archive.data.attributes.slug,
      // },
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
export async function getStaticProps({ params }: any) {
  // Run API calls in parallel

  const [comicSeoResponse, comicResponse] = await Promise.all([
    fetchAPI('/seo', {
      populate: 'deep',
    }),
    fetch(
      fetchAPIUrl(`/comics/${params.id}`, {
        populate: 'deep',
      })
    ),
  ]);

  const jsonResponse = await comicResponse.json();

  // const limit = jsonResponse.config.params._limit;
  // const start = jsonResponse.config.params._start;
  // const page = Math.floor(start / limit) + 1;
  // console.log('page: ', page);

  return {
    props: {
      comicSeo: comicSeoResponse.data,
      comic: jsonResponse.data,
    },
  };
}

export default Comic;
