import { MessageProps } from '@/interfaces/comic';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const Message = ({ type, apiMessage, close, data }: MessageProps) => {
  const [showMessage, setShowMessage] = useState<Boolean>(true);
  const { t } = useTranslation('common');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    let translatedMessage = '';
    switch (apiMessage) {
      case 'name not found':
        translatedMessage = t('name not found');
        break;
      case 'email not found':
        translatedMessage = t('email not found');
        break;
      case 'use valid email':
        translatedMessage = t('use valid email');
        break;
      case 'message not found':
        translatedMessage = t('message not found');
        break;
      case 'contact error':
        translatedMessage = t('contact error');
        break;
      case 'mail sent':
        translatedMessage = t('mail sent');
        translatedMessage + ' ' + data;
        break;
      default:
        break;
    }
    setMessage(translatedMessage);
  }, []);

  return (
    <>
      {showMessage && (
        <div
          className={`flex flex-col justify-start border-2 p-4 mx-auto mb-4 ${type}`}
        >
          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center mb-2">
              <div className="flex flex-col">
                {/* <p className="font-bold first-letter:uppercase ">{type}</p> */}
                <p>{message}</p>
              </div>
              <div className="flex flex-row gap-x-4 align-top">
                <Image
                  src={`/img/contact_${type}.svg`}
                  alt={`${type}`}
                  width={120}
                  height={120}
                />
                <i
                  className="cursor-pointer text-2xl"
                  onClick={() => {
                    setShowMessage(false);
                    close(false);
                  }}
                >
                  x
                </i>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
