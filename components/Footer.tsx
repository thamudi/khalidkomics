import { fetchAPI } from '@/lib/api';
import { NavigationItems } from '@/types/nav.type';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavItems from './NavItems';

export default function Footer() {
  const [seo, setSeo]: any = useState();
  const [locale, setLocale] = useState<string>('en');
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAPI('/seo', {
        populate: ['deep'],
      });

      setSeo(data.data.attributes.seo);
    };
    fetchData();
  }, []);

  useEffect(() => {
    getCookie('NEXT_LOCALE') && setLocale(getCookie('NEXT_LOCALE')!.toString());
  }, []);

  return (
    <div
      className="flex flex-col mt-4 py-8 px-8 lg:px-60"
      style={{
        backgroundColor: '#365687',
      }}
    >
      <div className="flex justify-between">
        {NavItems[locale].map((item: NavigationItems, i: number) => {
          return (
            <Link
              key={i}
              href={item.link}
              className="first-letter:uppercase text-white text-lg"
            >
              {item?.text}
            </Link>
          );
        })}
      </div>

      <div className="socialLink flex flex-row justify-between mt-14">
        <div className="flex items-center">
          <Image
            src={'/img/shukri.svg'}
            width={50}
            height={50}
            alt={'shukri'}
            className="mr-4"
          />
          <span className="text-white">
            © {new Date().getFullYear()} Khalid Nahar. All rights reserved.
          </span>
        </div>
        <div className="flex gap-x-4">
          {seo?.metaSocial.length &&
            seo?.metaSocial.map((socialMedia: any, i: number) => {
              return (
                <Link
                  key={i}
                  href={socialMedia.link}
                  className="text-white flex"
                >
                  <Image
                    src={`/img/icons/icons_${socialMedia.socialNetwork.toLowerCase()}_white.svg`}
                    alt={socialMedia.socialNetwork}
                    width={30}
                    height={30}
                  />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
