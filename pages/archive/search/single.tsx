import { ComicNav } from '@/components/ComicNav';
import Layout from '@/components/Layout';
import { ComicMeta } from '@/interfaces/comic';
import { fetchAPI, fetchAPIUrl } from '@/lib/api';
import SearchComponent from '@/components/Search';
import Comic from '@/components/Comic';
import { useState } from 'react';
interface props {
  comicsData: any;
  search: string;
  comicMeta: ComicMeta;
}

const Single = ({ comicsData, search }: props) => {
  const [comics, setComics] = useState(comicsData);
  const fetchComic = (pageNumber: number = comics.meta.pagination.page) => {
    fetch(
      fetchAPIUrl('/comics', {
        populate: '*',
        'sort[0]': 'releaseDate:desc',
        'pagination[pageSize]': 1,
        'pagination[page]': pageNumber,
        'filters[keywords][$contains]]': search,
      })
    )
      .then((res) => res.json())
      .then((data) => {
        setComics(data);
      });
  };

  return (
    <Layout>
      {/* {archivesSeo?.attributes && <Seo seo={archivesSeo.attributes.seo} />} */}
      <div className="flex flex-col items-center w-full">
        <h1 className="text-center font-bold mt-4">Archive</h1>
        {/* <SearchComponent /> */}
        {/* <h2 className="font-bold mx-8">Search Results for {search}</h2> */}
        {/* <div className="comics-list-container"> */}
        <>
          {comics?.data && <Comic comicData={comics} fetchComic={fetchComic} />}
        </>
        {/* </div> */}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const { id, q } = context.query;

  // Fetch data from external API
  const res = await fetchAPI(`/comics/${id}`, {
    populate: '*',
    'sort[0]': 'releaseDate:desc',
    'filters[keywords][$contains]': q,
  });

  // Pass data to the page via props
  return {
    props: {
      comicsData: res,
      search: q,
    },
  };
}

export default Single;