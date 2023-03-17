import { MessageProps } from '@/interfaces/comic';
import { useState } from 'react';

const Message = ({ type, message, close }: MessageProps) => {
  const [showMessage, setShowMessage] = useState<Boolean>(true);

  return (
    <>
      {showMessage && (
        <div
          className={`flex flex-col justify-start border-2 p-4 mx-auto mb-4 ${type}`}
        >
          <div className="flex flex-row justify-between items-center mb-2">
            <p className="font-bold first-letter:uppercase ">{type}</p>
            <i
              onClick={() => {
                setShowMessage(false);
                close(false);
              }}
            >
              x
            </i>
          </div>

          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Message;
