import React from 'react';

const ComicFootnote = ({ authorsNote }: any) => {
  return (
    <div className="footnote-container">
      <div className="flex flex-col items-center ">
        <p className="py-4 px-6">{authorsNote}</p>
      </div>
    </div>
  );
};

export default ComicFootnote;
