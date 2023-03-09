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
