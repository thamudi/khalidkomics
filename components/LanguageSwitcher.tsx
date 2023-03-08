import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';

import Image from 'next/image';
import Link from 'next/link';

const LanguageSwitcher: React.FC<{
  onChange?: (locale: string) => unknown;
}> = ({ onChange }) => {
  const { i18n } = useTranslation();
  const { language: currentLanguage } = i18n;
  const router = useRouter();
  // const locales = router.locales ?? [currentLanguage];

  const [value, setValue] = useState(i18n.language);

  const switchToLocale = useCallback(
    (locale: string) => {
      const path = router.asPath;

      return router.push(path, path, { locale });
    },
    [router]
  );

  const languageChanged = () => {
    console.log(currentLanguage);
    console.log(value);
    console.log(i18n);

    // await switchToLocale(locale);
  };

  return (
    <>
      <button onChange={() => languageChanged()}>
        <Image
          width={50}
          height={50}
          src="/img/icons/icons_lang_ar.svg"
          alt="switch ar"
        />
      </button>
    </>
  );
};

export default LanguageSwitcher;
