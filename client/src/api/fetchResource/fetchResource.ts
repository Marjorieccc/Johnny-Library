import { Filter } from '../../component/sideBar/sideBarFilter';
import { ResourceFilter, SearchResult} from '../../types/resource';

// fetch categories of resources
export async function fetchCategories(): Promise<ResourceFilter[]> {
  let categories:ResourceFilter[]=[];
  try {
    const response = await fetch(
      `http://localhost:8080/resources/categories`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    categories = await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
  console.log('categories: ' + categories);
  return categories;
}

// fetch formats of resources
export async function fetchFormat(): Promise<ResourceFilter[]> {
  let formats: ResourceFilter[] = [];

  try {
    const response = await fetch(
      `http://localhost:8080/resources/formats`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    formats = await response.json();
  } catch (error) {
    console.error('Error fetching formats:', error);
  }
  console.log(formats)
  return formats;
}

// fetch languages of resources
export async function fetchLanguages(): Promise<ResourceFilter[]> {
  let languages: ResourceFilter[] = [];

  try {
    const response = await fetch(
      `http://localhost:8080/resources/languages`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    languages = await response.json();
  } catch (error) {
    console.error('Error fetching languages:', error);
  }

  return languages;
}

// fetch resources by selected filters, if any
export async function fetchResources(
  pageNum:number,
  filterOptions?: Filter,
  searchTerm?: string,
): Promise<SearchResult> {
  const searchQueries = new URLSearchParams();
  
  searchTerm && console.log(searchTerm); 
  if (searchTerm) {
    searchQueries.append('title',searchTerm)
  }

  if (filterOptions)  {
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
