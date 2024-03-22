export interface ResourceProps {
  _id: string;
  title: string;
  thumbnail_url?: string;
  cover_url?: string;
  audience: string;
  category: string[];
  shortDescription?: string;
  longDescription?: string;
  medium: MediumProps[];
}

export interface MediumProps {
  _id: string;
  format: string;
  publisher: string;
  language: string[];
  year_of_publication: number;
  return_date: Date | null;
  status: string;
  reservedUser?: string[];
}

