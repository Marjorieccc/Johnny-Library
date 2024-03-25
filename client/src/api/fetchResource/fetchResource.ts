import { Filter } from "../../component/sideBar/sideBarFilter";
import { Resource, ResourceFilter, SearchResult } from "../../types/resource";
// export type Resource = {
//   resource_id: string;
//   call_number: string;
//   title: string;
//   author: string[];
//   category: string[];
//   format: string;
//   audience: string;
//   publisher: string;
//   language: string;
//   year_of_publication: number;
//   return_date: string | null;
//   status: string;
// };

export interface IMedium {
  _id: string;
  format: string;
  publisher: string;
  language: string[];
  year_of_publication: number;
  return_date: Date | null;
  status: string;
}

export interface IResource {
  _id: string;
  title: string;
  thumbnail_url?: string;
  cover_url?: string;
  audience: string;
  category: string[];
  shortDescription?: string;
  longDescription?: string;
  medium: IMedium[];
}

// fetch categories of resources
export async function fetchCategories(): Promise<ResourceFilter[]> {
  let categories: ResourceFilter[] = [];
  try {
    const response = await fetch(`http://localhost:8080/resources/categories`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    categories = await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
  console.log("categories: " + categories);
  return categories;
}

// fetch formats of resources
export async function fetchFormat(): Promise<ResourceFilter[]> {
  let formats: ResourceFilter[] = [];

  try {
    const response = await fetch(`http://localhost:8080/resources/formats`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    formats = await response.json();
  } catch (error) {
    console.error("Error fetching formats:", error);
  }
  console.log(formats);
  return formats;
}

// fetch languages of resources
export async function fetchLanguages(): Promise<ResourceFilter[]> {
  let languages: ResourceFilter[] = [];

  try {
    const response = await fetch(`http://localhost:8080/resources/languages`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    languages = await response.json();
  } catch (error) {
    console.error("Error fetching languages:", error);
  }

  return languages;
}

// fetch resources by selected filters, if any
export async function fetchResources(
  pageNum: number,
  filterOptions?: Filter,
  searchTerm?: string,
): Promise<SearchResult> {
  const searchQueries = new URLSearchParams();

  searchTerm && console.log(searchTerm);
  if (searchTerm) {
    searchQueries.append("title", searchTerm);
  }

  if (filterOptions) {
    for (const [key, value] of Object.entries(filterOptions)) {
      if (value && value.length) {
        if (Array.isArray(value)) {
          for (const parsedValue of value) {
            searchQueries.append(key, parsedValue);
          }
        } else {
          searchQueries.append(key, value);
        }
      }
    }
  }

  let filteredResource: SearchResult = {
    data: [],
    totalItems: 0,
    startIndex: 0,
    endIndex: 0,
  };

  try {
    const searchlink = `http://localhost:8080/resources/search?${searchQueries.toString()}&page=${pageNum}`;
    console.log(searchlink);
    const response = await fetch(searchlink);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    filteredResource = await response.json();
  } catch (error) {
    console.log("Error fetching resource:", error);
    throw error;
  }

  return filteredResource;
}

// fetch matching resources with resource title or resource author as keyword
export async function fetchBySearchTerm(
  searchTerm: string,
): Promise<IResource[]> {
  console.log("Fetching resource for:", searchTerm);
  let searchResult = [];
  try {
    const response = await fetch(
      `http://localhost:8080/resources/search?title=${searchTerm}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    searchResult = await response.json();
  } catch (error) {
    console.error("Error fetching resource:", error);
  }
  return searchResult;
}

export async function makeReservationAPI(
  userID: string,
  resourceID: string,
  mediumDetailID: string,
) {
  let reserveredSuccess = true;
  try {
    console.log("making reservation");
    const response = await fetch(`/api/reservation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, resourceID, mediumDetailID }),
    });
    if (!response.ok) {
      throw new Error("Failed to make reservation");
    }
    reserveredSuccess = await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
  return reserveredSuccess;
}

export async function fetchByID(resource_id: string): Promise<Resource> {
  console.log("Fetching resource with ID:", resource_id);
  let resource = {} as Resource;
  try {
    const response = await fetch(
      `http://localhost:8080/resources/${resource_id}`,
    );
    if (!response.ok) {
      throw new Error("Fail");
    }
    resource = await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
  return resource;
}
