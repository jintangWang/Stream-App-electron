export interface BasicPageParams {
  page: number;
  size: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}
