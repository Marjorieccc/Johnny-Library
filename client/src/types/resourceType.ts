export type Medium = {
  _id: string;
  format: string;
  publisher: string;
  language: string[];
  year_of_publication: number;
  return_date: Date | null;
  status: string;
};

export type Resource = {
  _id: string;
  title: string;
  thumbnail_url?: string;
  cover_url?: string;
  audience: string;
  category: string[];
  shortDescription?: string;
  longDescription?: string;
  medium: Medium[];
};

export type ResourceFilter = {
  _id: string;
  name: string;
};

export type FilterList = {
  format: string[];
  category: string[];
  language: string[];
};

export type SetFilterStateProps = {
  selectFilter: FilterList;
  setSelectFilter: React.Dispatch<FilterList>;
};

export type SearchResult = {
  data: Resource[];
  totalItems: number;
  startIndex: number;
  endIndex: number;
};

export type ResourceRev = {
  _id: string;
  userID: string;
  resourceID: string;
  resourceTitle: string;
  mediumID: string;
  format: string;
  time: Date;
};
