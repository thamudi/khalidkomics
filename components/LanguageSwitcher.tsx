import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { setCookie, getCookie } from 'cookies-next';

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<string | undefined>(
    router.locale
  );
  const [otherLocale, setOtherLocale] = useState<string>('ar');

  const switchToLocale = (newLocale: string = otherLocale) => {
    const path = router.asPath;
    console.log('clicked again', otherLocale);
    console.log('clicked again', currentLocale);

    setCurrentLocale(otherLocale);

    setCookie('NEXT_LOCALE', newLocale, {
      maxAge: 31536000,
      path: '/',
    });

    router.push(path, path, { locale: newLocale });
  };

  useEffect(() => {
    setOtherLocale(currentLocale === 'en' ? 'ar' : 'en');
  }, [currentLocale]);

  useEffect(() => {
    getCookie('NEXT_LOCALE') &&
      switchToLocale(getCookie('NEXT_LOCALE')?.toString());
  }, []);

  return (
    <>
      <button onClick={() => switchToLocale()}>
        <Image
          width={50}
          height={50}
          src={`/img/icons/icons_lang_${otherLocale}_2.svg`}
          alt={`switch ${otherLocale}`}
        />
      </button>
    </>
  );
};

export default LanguageSwitcher;
