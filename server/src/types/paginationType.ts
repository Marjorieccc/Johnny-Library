import { Resources } from "./resourceType";

export type ResourcePaginationReturn = {
  data: Resources[];
  totalItems: number;
  startIndex: number;
  endIndex: number;
};
