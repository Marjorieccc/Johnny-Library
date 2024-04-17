import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { FilterList, SetFilterStateProps } from "../../types/resourceType";
import {
  fetchCategories,
  fetchFormat,
  fetchLanguages,
} from "../../api/fetchResource/fetchResource";
import DropDownItems from "../dropDownList/dropDownItems";
import DropDownList from "../dropDownList/dropDownList";

export default function ResourceFilter({
  selectFilter,
  setSelectFilter,
}: SetFilterStateProps) {
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
  // ----------- Filter Checked State -----------
  const [selectedList, setselectedList] = useState<FilterList>();

  // ----------- User Filter Selection -----------
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
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
  }

  function updateFilterList(
    filterCategory: string[],
    selectedFilter: string,
  ): string[] {
    const indexOfFilter = filterCategory.indexOf(selectedFilter);

    // Remove the filter when it is already in the filter list
    if (indexOfFilter !== -1) {
      filterCategory.splice(indexOfFilter, 1);
    } else {
      // Add new filter on list
      filterCategory.push(selectedFilter);
    }

    return filterCategory;
  }

  // ----------- Reset Filters -----------
  function handleResetFilters() {
    setSelectFilter({
      format: [],
      category: [],
      language: [],
    });
  }
  // Update checkboxes according to user selection
  useEffect(() => {
    setselectedList(selectFilter);
  }, [selectFilter]);

  // ----------- Loading -----------
  if (isLoadingCategory || isLoadingLanguages || isLoadingFormat) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DropDownList>
        {/* Filter by Format */}
        <DropDownItems title="Format">
          {formatList?.map((item) => (
            <li key={item._id}>
              <label className="flex gap-2">
                <input
                  onChange={handleChange}
                  type="checkbox"
                  name="Format"
                  value={item.name}
                  checked={selectFilter.format.includes(item.name)}
                />
                {item.name}
              </label>
            </li>
          ))}
        </DropDownItems>
        {/* Filter by Category */}
        <DropDownItems title="Category">
          {categoryList?.map((item) => (
            <li key={item._id}>
              <label className="flex gap-2">
                <input
                  onChange={handleChange}
                  type="checkbox"
                  name="Category"
                  value={item.name}
                  checked={selectFilter.category.includes(item.name)}
                />
                {item.name}
              </label>
            </li>
          ))}
        </DropDownItems>
        {/* Filter by Language */}
        <DropDownItems title="Language">
          {languageList?.map((item) => (
            <li key={item._id}>
              <label className="flex gap-2">
                <input
                  onChange={handleChange}
                  type="checkbox"
                  name="Language"
                  value={item.name}
                  checked={selectFilter.language.includes(item.name)}
                />
                {item.name}
              </label>
            </li>
          ))}
        </DropDownItems>
      </DropDownList>

      {/* Reset Filter Button */}
      <div className="my-4 flex flex-col items-center justify-center">
        <button
          className="rounded-full border-2 border-[#E32B31]  px-6 py-2 text-[#E32B31]"
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
      </div>
    </>
  );
}
