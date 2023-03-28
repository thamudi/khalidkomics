import Layout from '@/components/Layout';
import Seo from '@/components/Seo';
import Image from 'next/image';
import { fetchAPI } from '@/lib/api';
import NavItems from '@/components/NavItems';
import Link from 'next/link';
import { NavigationItems } from '@/types/nav.type';

export default function Home({ comicSeo, locale }: any) {
  const pageContent: any = {
    en: {
      title: "This cup's empty :(",
      paragraph_1:
        "It looks like the page you're looking for has been moved or no longer exists.",
      paragraph_2:
        "Perhaps you can find what you're looking for in one of the below links:",
    },
    ar: {
      title: 'هلفنجان مش مليان :(',
      paragraph_1: 'يبدو أنه تم نقل الصفحة التي تبحث عنها أو لم تعد موجودة',
      paragraph_2: 'يمكنك أن تجدعنه في أحد الروابط أدناه',
    },
  };

  return (
    <Layout>
      <div
        className=" mt-24 container px-12 md:w-1/2 md:mx-auto"
        style={{ height: '68vh' }}
      >
        <div className="flex flex-col gap-y-4 lg:gap-y-8">
          {comicSeo?.attributes && <Seo seo={comicSeo.attributes.seo} />}
          <h1 className="font-bold">{pageContent[locale].title}</h1>
          <p>{pageContent[locale].paragraph_1}</p>
          <p>{pageContent[locale].paragraph_2}</p>
          <div className="flex justify-between w-full">
            {NavItems[locale].map((item: NavigationItems, i: number) => {
              return (
                <Link
                  key={i}
                  href={item.link}
                  className="first-letter:uppercase text-link-blue text-lg"
                >
                  {item?.text}
                </Link>
              );
            })}
          </div>
          <div className="flex justify-end mt-8">
            <Image
              src={'/img/404.svg'}
              alt={'404 empty cup'}
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }: any) {
  // Run API calls in parallel
  console.log(locale);

  const [comicSeoResponse] = await Promise.all([
    fetchAPI('/seo', {
      populate: 'deep',
    }),
  ]);

  return {
    props: {
      comicSeo: comicSeoResponse.data,
      locale: locale,
    },
  };
}
