import { ResourceModel } from "./resourceType";

export type ResourcePaginationReturn = {
  data: ResourceModel[];
  totalItems: number;
  startIndex: number;
  endIndex: number;
};
