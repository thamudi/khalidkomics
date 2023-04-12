import { LinkCreator } from '@/lib/LinkCreator';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Search = ({ placeholderText }: any) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const placeholder = placeholderText
    ? placeholderText
    : t('search placeholder');

  const searchComic = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      searchtext: { value: string };
    };
    router.push(
      LinkCreator.toQuery(
        { q: target.searchtext.value.toLocaleLowerCase() },
        '/archive/search'
      )
    );
  };
  return (
    <div id="search">
      <form onSubmit={searchComic} className="mx-4">
        <input name="searchtext" type="text" placeholder={placeholder} />
        <input type="submit" value="Submit!" />
      </form>
    </div>
  );
};

export default Search;
