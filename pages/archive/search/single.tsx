import Layout from '@/components/Layout';
import { SearchProps } from '@/interfaces/comic';
import { fetchAPI } from '@/lib/api';
import Comic from '@/components/Comic';
import { useState } from 'react';

const Single = ({ comicsData, search }: SearchProps) => {
  const [comics, setComics] = useState(comicsData);
  const fetchComic = async (
    pageNumber: number = comics.meta.pagination.page
  ) => {
    const responseData = await fetchAPI('/comics', {
      populate: '*',
      'sort[0]': 'releaseDate:desc',
      'pagination[pageSize]': 1,
      'pagination[page]': pageNumber,
      'filters[keywords][$contains]]': search,
    });
    setComics(responseData);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center w-full">
        <h1 className="text-center font-bold mt-4">Archive</h1>
        <>
          {comics?.data && <Comic comicData={comics} fetchComic={fetchComic} />}
        </>
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
