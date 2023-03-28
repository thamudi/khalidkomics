import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import { fetchAPI } from '@/lib/api';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/media';

export default function About({ about }: any) {
  const image = getStrapiMedia(about.attributes.ImageBanner);
  return (
    <Layout>
      <div className="flex flex-col items-center">
        {about?.attributes && (
          <>
            <Seo seo={about.attributes.seo} />
            <div className="subPage">
              <h1 className="text-center font-bold mt-4">
                {about.attributes.AboutTitle}
              </h1>
              <div className="wrapper">
                <Image
                  width={500}
                  height={600}
                  alt={`${about.attributes.AboutTitle} image`}
                  src={image}
                />
                <div id="authorBlurb">
                  <p className="mt-4">{about.attributes.Content}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }: any) {
  // Run API calls in parallel
  const [aboutPageResponse] = await Promise.all([
    fetchAPI('/about', {
      populate: 'deep',
      locale: locale,
    }),
  ]);

  return {
    props: {
      about: aboutPageResponse.data,
    },
  };
}
