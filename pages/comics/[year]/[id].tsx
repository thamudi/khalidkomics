import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { fetchAPI, fetchAPIUrl } from '@/lib/api';
import { default as ComicComponent } from '@/components/Comic';
import { useState } from 'react';

const Comic = ({ comicSeo, comicData, year }: any) => {
  const [comic, setComic] = useState(comicData);
  const fetchComic = (pageNumber: number = comic.meta.pagination.page) => {
    fetch(
      fetchAPIUrl('/comics', {
        populate: '*',
        'sort[0]': 'releaseDate:desc',
        'pagination[pageSize]': 1,
        'pagination[page]': pageNumber,
        'filters[archive][slug][$eq]': year,
      })
    )
      .then((res) => res.json())
      .then((data) => {
        setComic(data);
      });
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        {comicSeo?.attributes && <Seo seo={comicSeo.attributes.seo} />}
        <>
          {comic?.data && (
            <ComicComponent comicData={comic} fetchComic={fetchComic} />
          )}
        </>
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
function setComic(data: any) {
  throw new Error('Function not implemented.');
}
