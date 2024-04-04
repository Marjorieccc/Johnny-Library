import React from "react";
import { useQuery } from "@tanstack/react-query";

import CategoryFilter from "./categoryFilter";
import {
  fetchCategories,
  fetchFormat,
  fetchLanguages,
} from "../../api/fetchResource/fetchResource";
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
    queryFn: fetchFormat,
    staleTime: Infinity,
  });
  const { data: categoryList, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });
  const { data: languageList, isLoading: isLoadingLanguages } = useQuery({
    queryKey: ["language"],
    queryFn: fetchLanguages,
    staleTime: Infinity,
  });

  // ----------- User Filter Options -----------
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Update filter
    switch (event.target.name) {
      case "Format": {
        const newFormatFilter = updateFilterList(
          [...selectFilter.format],
          value,
        );
        setSelectFilter({
          format: newFormatFilter,
          category: [...selectFilter.category],
          language: [...selectFilter.language],
        });
        break;
      }
      case "Category": {
        const newCategoryFilter = updateFilterList(
          [...selectFilter.category],
          value,
        );
        setSelectFilter({
          format: [...selectFilter.format],
          category: newCategoryFilter,
          language: [...selectFilter.language],
        });
        break;
      }
      case "Language": {
        const newLanguageFilter = updateFilterList(
          [...selectFilter.language],
          value,
        );
        setSelectFilter({
          format: [...selectFilter.format],
          category: [...selectFilter.category],
          language: newLanguageFilter,
        });
        break;
      }
    }
  };

  // ----------- Loading -----------
  if (isLoadingCategory || isLoadingLanguages || isLoadingFormat) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container ml-auto mr-0 mt-16 flex w-full max-w-60 flex-wrap px-2 pt-8 lg:pt-16">
        <div className="w-full text-base leading-normal text-gray-800 lg:px-5">
          {/* hidden side bar for small browser*/}
          <div className="inset-0 block lg:hidden">
            <button
              id="menu-toggle"
              className="flex w-full appearance-none justify-end rounded border border-gray-600 bg-white px-3
              py-3 hover:border-purple-500 focus:outline-none lg:bg-transparent"
            >
              <svg
                className="float-right h-3 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
          </div>

          {/* Filter Input Section */}
          <div
            id="menu-content"
            className="top:5em; inset-0 z-20 mt-0 hidden h-64 w-60 shrink-0 overflow-y-auto 
            overflow-x-hidden shadow lg:block lg:h-auto lg:overflow-y-hidden lg:border-transparent lg:bg-transparent lg:shadow-none"
          >
            <h1 className="pb-4 text-2xl font-medium">Filter</h1>
            {/* Filter by Format */}
            <ul className="divide-y border-y">
              {formatList && (
                <CategoryFilter
                  category="Format"
                  itemList={formatList}
                  handleChange={handleChange}
                />
              )}
              {/* Filter by Category */}
              {categoryList && (
                <CategoryFilter
                  category="Category"
                  itemList={categoryList}
                  handleChange={handleChange}
                />
              )}
              {/* Filter by Language */}
              {languageList && (
                <CategoryFilter
                  category="Language"
                  itemList={languageList}
                  handleChange={handleChange}
                />
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
