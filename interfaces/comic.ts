export interface Comic {
  title: string;
  slug: string;
  authorsNote: string;
}

export interface ComicMeta {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

export interface ComicProp {
  data: any;
  meta: any;
}

export interface SearchProps {
  comicsData: any;
  search: string;
  comicMeta: ComicMeta;
  locale?: string;
}

export interface ComicNavProps {
  comicMetaData: ComicMeta;
  fetchComic: (pageNumber: number) => void;
}

export interface ContactBody {
  name: string;
  email: string;
  message: string;
}

export interface MessageProps {
  type: string;
  apiMessage: string;
  close: (status: boolean) => any;
  data?: string;
}
