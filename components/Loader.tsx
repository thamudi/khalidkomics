import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const Loader = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <div style={{ height: '70vh' }} className="flex items-center">
        <Image
          src={'/img/loading-surf.gif'}
          alt={t('loading')}
          width={250}
          height={250}
        />
      </div>
    </>
  );
};

export default Loader;
