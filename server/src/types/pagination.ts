import { Resources } from "./resource";

export type ResourcePaginationReturn = {
  data: Resources[];
  totalItems: number;
  startIndex: number;
  endIndex: number;
};
