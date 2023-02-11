import { fetchAPIUrl } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [seo, setSeo]: any = useState();

  useEffect(() => {
    fetch(
      fetchAPIUrl('/seo', {
        populate: ['deep'],
      })
    )
      .then((res) => res.json())
      .then((data) => {
        setSeo(data.data.attributes.seo);
      });
  }, []);

  return (
    <div
      className="h-32 flex flex-col py-4 px-8"
      style={{
        backgroundColor: '#355686',
        borderTop: '#56a7d9 solid 4px',
      }}
    >
      <div className="socialLink flex flex-col">
        {seo?.metaSocial.length && (
          <>
            {seo?.metaSocial.map((socialMedia: any, i: number) => {
              return (
                <div>
                  <Link
                    href={socialMedia.link}
                    className="text-white flex gap-x-4 my-2"
                  >
                    <Image
                      src={`/img/icons/icons_${socialMedia.socialNetwork.toLowerCase()}.svg`}
                      alt={socialMedia.socialNetwork}
                      width={30}
                      height={30}
                    />
                    {socialMedia.title}
                  </Link>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
