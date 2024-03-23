import { Filter } from "../../component/sideBar/sideBarFilter";
import { ResourceProps } from "../../types/resource";
export type Resource = {
  resource_id: string;
  call_number: string;
  title: string;
  author: string[];
  category: string[];
  format: string;
  audience: string;
  publisher: string;
  language: string;
  year_of_publication: number;
  return_date: string | null;
  status: string;
};

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
export async function fetchCategories(): Promise<string[]> {
  const categories: string[] = [
    "Fiction",
    "Nonfiction",
    "Adult Fiction",
    "Romance",
    "Fantasy",
    "Mystery",
    "Thrillers",
    "Sci-Fi",
    "Historical",
    "Contemporary",
    "Classics",
    "Biography and Autobiography",
    "Religion and Spirituality",
    "History and Geography",
    "Cooking, Food and Wine",
    "Self-Help",
    "Health and Fitness",
    "Business and Economics",
    "Philosophy",
    "True Crime",
  ];
  return categories;
}

// fetch format of resources
export async function fetchFormat(): Promise<string[]> {
  const formats: string[] = [
    "Book",
    "eBook",
    "DVD",
    "Magazine",
    "Music CD",
    "Graphic Novel",
    "Comic Book",
    "Video Game",
    "Blu-ray Disc",
    "Audiobook CD",
  ];

  return formats;
}

// fetch language of resources
export async function fetchLanguages(): Promise<string[]> {
  const languages: string[] = [
    "English",
    "French",
    "Traditional Chinese",
    "Spanish",
    "Italian",
    "German",
    "Japanese",
    "Korean",
  ];

  return languages;
}

// fetch resources
export async function fetchResources(): Promise<Resource[]> {
  let resourceList: Resource[] = [];

  try {
    const response = await fetch(`http://localhost:8080/resources`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    resourceList = await response.json();
  } catch (error) {
    console.log("Error fetching resource:", error);
  }

  return resourceList;
}

// fetch resources by selected filters, if any
export async function fetchByFilter(
  filterOptions: Filter,
  options?: {
    searchTerm?: string;
  },
): Promise<Resource[]> {
  let filteredResource: Resource[] = [];
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(filterOptions)) {
    if (value && value.length) {
      if (Array.isArray(value)) {
        for (const parsedValue of value) {
          searchParams.append(key, parsedValue);
        }
      } else {
        searchParams.append(key, value);
      }
    }
  }

  try {
    const response = await fetch(
      `http://localhost:8080/resources/search?${searchParams.toString()}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    filteredResource = await response.json();
  } catch (error) {
    console.log("Error fetching resource:", error);
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

export async function fetchByID(resource_id: string): Promise<ResourceProps> {
  console.log("Fetching resource with ID:", resource_id);
  let resource = {} as ResourceProps;
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
