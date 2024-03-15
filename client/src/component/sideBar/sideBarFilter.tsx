import React, { SetStateAction } from "react";
import CategoryFilter from "./categoryFilter";
import { fetchCategories, fetchFormat, fetchLanguages } from "../../api/fetchResource/fetchResource";
import { useQuery } from "@tanstack/react-query";
import { updateFilterList } from "../../api/filter";

export type Filter = {
  format: string[];
  category: string[];
  language: string[];
};

export type SetFilterState = {
  selectFilter: Filter;
  setSelectFilter: React.Dispatch<Filter>;
};

export default function SideBarFilter({
  selectFilter,
  setSelectFilter,
}: SetFilterState) {
  // ----------- Fetch Filter Options -----------
  const { data: formatList, isLoading: isLoadingFormat } = useQuery({
    queryKey: ["format"],
    queryFn: () => fetchFormat(),
    staleTime: Infinity,
  });
  const { data: categoryList, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["category"],
    queryFn: () => fetchCategories(),
    staleTime: Infinity,
  });
  const { data: languageList, isLoading: isLoadingLanguages } = useQuery({
    queryKey: ["language"],
    queryFn: () => fetchLanguages(),
    staleTime: Infinity,
  });

  // ----------- User Filter Options -----------
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Update filter
    switch (event.target.name) {
      case "Format":
        const newFormatFilter = updateFilterList(
          [...selectFilter.format],
          value
        );
        setSelectFilter({
          format: newFormatFilter,
          category: [...selectFilter.category],
          language: [...selectFilter.language],
        });
        break;

      case "Category":
        const newCategoryFilter = updateFilterList([...selectFilter.category], value);
        setSelectFilter({
          format: [...selectFilter.format],
          category: newCategoryFilter,
          language: [...selectFilter.language],
        });
        break;

      case "Language":
        const newLanguageFilter = updateFilterList([...selectFilter.language], value);
        setSelectFilter({
          format: [...selectFilter.format],
          category: [...selectFilter.category],
          language: newLanguageFilter,
        });
        break;
    }
  };

  // ----------- Loading -----------
  if (isLoadingCategory || isLoadingLanguages || isLoadingFormat) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16">
        <div className="w-full lg:w-1/5 lg:px-6 text-xl text-gray-800 leading-normal">
          {/* Header */}
          <p className="text-xl font-medium font-bold py-2 lg:pb-6 text-gray-700">
            Filter By:
          </p>

          {/* hidden side bar for small browser*/}
          <div className="block lg:hidden sticky inset-0">
            <button
              id="menu-toggle"
              className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded
             border-gray-600 hover:border-purple-500 appearance-none focus:outline-none"
            >
              <svg
                className="fill-current h-3 float-right"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
          </div>

          {/* Filter Input Section */}
          <div
            className="w-full sticky inset-0 hidden h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden 
          lg:block mt-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20 top:5em;"
            id="menu-content"
          >
            <ul className="list-reset">
              {/* Filter by Category */}
              {formatList && (
                <li>
                  <CategoryFilter
                    category="Format"
                    itemList={formatList}
                    handleChange={handleChange}
                  />
                </li>
              )}
              {categoryList && (
                <li>
                  <CategoryFilter
                    category="Category"
                    itemList={categoryList}
                    handleChange={handleChange}
                  />
                </li>
              )}
              {/* Filter by Language */}
              {languageList && (
                <li>
                  <CategoryFilter
                    category="Language"
                    itemList={languageList}
                    handleChange={handleChange}
                  />
                </li>
              )}
              {/* Filter by Format */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
