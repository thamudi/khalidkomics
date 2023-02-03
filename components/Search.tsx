import { LinkCreator } from '@/lib/LinkCreator';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Search = () => {
  const router = useRouter();

  const searchComic = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      searchtext: { value: string };
    };
    router.push(
      LinkCreator.toQuery({ q: target.searchtext.value }, '/archive/search')
    );
  };
  return (
    // <div className="fixed bottom-16 right-5">
    //   <div className="">
    //     <Image
    //       src={'/img/icons/icons_search.svg'}
    //       alt={'search icon'}
    //       width={65}
    //       height={65}
    //     />
    //   </div>
    // </div>
    <div id="search">
      <form onSubmit={searchComic}>
        <input name="searchtext" type="text" />
        <input type="submit" value="Search!" />
      </form>
    </div>
  );
};

export default Search;
