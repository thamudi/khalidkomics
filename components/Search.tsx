import { LinkCreator } from '@/lib/LinkCreator';
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
    <div id="search">
      <form onSubmit={searchComic}>
        <input name="searchtext" type="text" />
        <input type="submit" value="Submit!" />
      </form>
    </div>
  );
};

export default Search;
