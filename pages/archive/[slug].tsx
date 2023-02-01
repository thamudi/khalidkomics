import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { fetchAPI, fetchAPIUrl } from '@/lib/api';
import { getStrapiMedia, getStrapiThumbnailMedia } from '@/lib/media';
import Image from 'next/image';
import Link from 'next/link';

const ArchiveList = ({ archivesSeo, archive, comics, slug }: any) => {
  return (
    <Layout>
      <div className="subPage">
        {archivesSeo?.attributes && <Seo seo={archivesSeo.attributes.seo} />}
        <div className="flex flex-col items-center my-4">
          <h1 className="text-center font-bold mt-4">Archive</h1>
          <h2 className="font-bold">{slug}</h2>
          <div>
            {comics.length &&
              comics.map((comic: any) => {
                return (
                  <Link
                    href={`/comics/${comic.id}`}
                    className="flex items-center my-4 outline p-4"
                  >
                    <Image
                      src={getStrapiMedia(comic.attributes.thumbnail)}
                      alt={comic.attributes.title}
                      width={100}
                      height={100}
                      className="rounded-full object-cover mr-5"
                    />
                    <h3>{comic.attributes.title}</h3>
                  </Link>
                );
              })}
          </div>
        </div>
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
    fetchAPIUrl(`/archives`, {
      populate: 'deep',
    })
  );
  //format the data as a json object
  const archives = await res.json();

  // create an object of params Ids
  const paths = archives.data.map((archive: any) => ({
    params: {
      slug: archive.attributes.slug,
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

  const [archivesSeoResponse, archivesResponse] = await Promise.all([
    fetchAPI('/seo', {
      populate: 'deep',
    }),
    fetch(
      fetchAPIUrl(`/archives/`, {
        populate: 'deep',
        'filters[slug][$eq]': params.slug,
      })
    ),
  ]);

  const archivesJson = await archivesResponse.json();

  return {
    props: {
      archivesSeo: archivesSeoResponse.data,
      archive: archivesJson.data[0],
      comics: archivesJson.data[0].attributes.comics.data,
      slug: params.slug,
    },
  };
}

export default ArchiveList;
