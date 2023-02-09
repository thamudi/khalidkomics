import Layout from '@/components/Layout';
import Search from '@/components/Search';
import Seo from '@/components/Seo';
import { fetchAPI } from '@/lib/api';
import Link from 'next/link';

export default function Archive({ archivesSeo, archives }: any) {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <>
          <div className="subPage">
            {archivesSeo?.attributes && (
              <Seo seo={archivesSeo.attributes.seo} />
            )}
            <h1 className="text-center font-bold mt-4">Archive</h1>
            <Search />
            {archives.length && (
              <div className="flex flex-col items-center my-4">
                {archives.map((archive: any) => {
                  return (
                    <Link
                      href={`/archive/${archive.attributes.slug}`}
                      className="italic"
                      key={archive.attributes.slug}
                    >
                      <div
                        key={archive.attributes.id}
                        className="my-4 p-8 outline"
                      >
                        {archive.attributes.title}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [archivesSeoResponse, archivesResponse] = await Promise.all([
    fetchAPI('/seo', {
      populate: ['deep'],
    }),
    fetchAPI('/archives', {
      'sort[0]': 'title:desc',
    }),
  ]);

  return {
    props: {
      archivesSeo: archivesSeoResponse.data,
      archives: archivesResponse.data,
    },
  };
}
