import Layout from '@/components/Layout';
import Media from '@/components/Media';
import Search from '@/components/Search';
import Seo from '@/components/Seo';
import { fetchAPI } from '@/lib/api';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function Archive({ archivesSeo, archives }: any) {
  const { t } = useTranslation('common');
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <>
          {archivesSeo?.attributes && <Seo seo={archivesSeo.attributes.seo} />}
          <div className="flex flex-col items-center w-full">
            <h1 className="text-center font-bold mt-4">{t('archive title')}</h1>
            <Search />
            <p className="text-center">{t('alternate search')}</p>
            {archives.length && (
              <div className="grid grid-cols-2 gap-4 w-fit mx-auto  my-4">
                {archives.map((archive: any) => {
                  return (
                    <Link
                      href={`/archive/${archive.attributes.slug}`}
                      className="w-fit"
                      key={archive.attributes.slug}
                    >
                      <Media
                        media={archive.attributes.thumbnail}
                        title={archive.attributes.slug}
                        width={135}
                        height={135}
                        className={'overlay'}
                      />
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

export async function getStaticProps({ locale }: any) {
  // Run API calls in parallel
  const [archivesSeoResponse, archivesResponse] = await Promise.all([
    fetchAPI('/seo', {
      populate: ['deep'],
    }),
    fetchAPI('/archives', {
      populate: ['deep'],
      'sort[0]': 'title:desc',
      locale: locale,
    }),
  ]);

  return {
    props: {
      archivesSeo: archivesSeoResponse.data,
      archives: archivesResponse.data,
      locale: locale,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}
