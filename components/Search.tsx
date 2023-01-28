import Image from 'next/image';

const Search = () => {
  return (
    <div className="fixed bottom-16 right-5">
      <div className="">
        <Image
          src={'/img/icons/icons_search.svg'}
          alt={'search icon'}
          width={65}
          height={65}
        />
      </div>
    </div>
  );
};

export default Search;
