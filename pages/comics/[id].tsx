import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { fetchAPI, fetchAPIUrl } from '@/lib/api';
import { useEffect, useState } from 'react';
import { default as ComicComponent } from '@/components/Comic';
import { NextApiResponse } from 'next';

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
      id: comic.id.toString(),
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

  const comicSeoResponse = await fetchAPI('/seo', {
    populate: ['seo', 'seo.metaImage', 'seo.metaSocial'],
  });

  const comicResponse = await fetch(
    fetchAPIUrl(`/comics/${params.id}`, {
      populate: '*',
    })
  );
  const comicJson = await comicResponse.json();

  // const [comicSeoResponse, comicResponse] = await Promise.all([
  //   fetchAPI('/seo', {
  //     populate: ['seo', 'seo.metaImage', 'seo.metaSocial'],
  //   }),
  //   fetch(
  //     fetchAPIUrl(`/comics/${params.id}`, {
  //       populate: '*',
  //     })
  //   ),
  // ]);

  return {
    props: {
      comicSeo: comicSeoResponse.data,
      comic: comicJson.data,
    },
  };
}

export default Comic;
