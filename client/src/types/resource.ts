export type Medium = {
  _id: string;
  format: string;
  publisher: string;
  language: string[];
  year_of_publication: number;
  return_date: Date | null;
  status: string;
}

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
}

export type ResourceFilter = {
  _id: string;
  name: string;
};

export type SearchResult = {
  data: Resource[];
  totalItems: number;
  startIndex: number;
  endIndex: number;
}