import { mongo } from "mongoose";
import { resourceMongoQuery } from "./resourceQuery";
import Resource, {IResource} from "../models/resourceModel";

export type resourcePaginationReturn ={
    data: IResource[];
    totalItems: number ;
    startIndex: number;
    endIndex: number;
}

type resourceMongoQueries = resourceMongoQuery | { $and: resourceMongoQuery[] };

// function signature, prepare for pagination for different argument and returns 
export async function resourcePagination(resourceMongoQueries: resourceMongoQueries, page:number):Promise<resourcePaginationReturn>;

// pagination for filter and search from user input
export async function resourcePagination(resourceMongoQueries: resourceMongoQueries, page:number):Promise<resourcePaginationReturn>{
    const limit = 10;
    const skipIndex = (page - 1) * limit;
    
    console.log("pagination received" + JSON.stringify(resourceMongoQueries));
    const resultByPage = await Resource.aggregate([
        {
            $match: resourceMongoQueries
        },
        {
            $facet:{ 
                data:[{$skip:skipIndex},{$limit:limit}],
                totalCount: [{$count: 'count'}]
            }
        }
    ]);

    const data = resultByPage[0].data;
    const totalItems = resultByPage[0].totalCount[0] ? resultByPage[0].totalCount[0].count : 0;
    const startIndex = skipIndex + 1;
    const endIndex = Math.min(startIndex + limit - 1, totalItems);

    return {data, totalItems, startIndex, endIndex};
}