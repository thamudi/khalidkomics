import { MessageProps } from '@/interfaces/comic';
import { useState } from 'react';
import Image from 'next/image';

const Message = ({ type, message, close }: MessageProps) => {
  const [showMessage, setShowMessage] = useState<Boolean>(true);

  return (
    <>
      {showMessage && (
        <div
          className={`flex flex-col justify-start border-2 p-4 mx-auto mb-4 ${type}`}
        >
          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center mb-2">
              <div className="flex flex-col">
                <p className="font-bold first-letter:uppercase ">{type}</p>
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
