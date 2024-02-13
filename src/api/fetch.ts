import data from "./resources.json";

export type Resource = {
  resource_id: string;
  call_number: string;
  title: string;
  author: string;
  category: {
    Fiction?: string[];
    Nonfiction?: string[];
  };
  format: string;
  audience: string;
  publisher: string;
  language: string;
  year_of_publication: number;
  return_date: string | null;
  status: string;
};

// fetch categories of resources
export async function fetchCategories(): Promise<string[]> {
  const categories: string[] = [
    "Fiction",
    "Non-Fiction",
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
  const subcategories: string[] = [
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

  return categories.concat(subcategories);
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

// fetch resources according to filter options
export async function fetchByFilter(
  queryCategories: string[] = [],
  queryFormat: string[] = [],
  queryLanguage: string[] = []
): Promise<Resource[]> {
  const resourcesList: Resource[] = [];

  data.resources.forEach((resource) => {
    let isFilter = false;
    // fetch by category
    for (let i = 0; (isFilter == false && i < queryCategories.length); i++) {
      if (
        Object.keys(resource.category).includes(queryCategories[i]) ||
        resource.category.Fiction?.includes(queryCategories[i]) ||
        resource.category.Nonfiction?.includes(queryCategories[i])
      ) {
        resourcesList.push(resource);
        isFilter = true;
      }
    }
    // fetch by format
    if (!isFilter) {
      for (let i = 0; (isFilter == false && i < queryFormat.length); i++) {
        if (resource.format.includes(queryFormat[i])) {
          resourcesList.push(resource);
          isFilter = true;
        }
      }
    }
    // fetch by language
    if (!isFilter) {
      for (let i = 0; (isFilter == false && i < queryLanguage.length); i++) {
        if (resource.language.includes(queryLanguage[i])) {
          resourcesList.push(resource);
          isFilter = true;
        }
      }
    }
  });

  return resourcesList;
}
