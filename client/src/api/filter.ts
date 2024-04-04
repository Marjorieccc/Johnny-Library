export function updateFilterList(
  filterCategory: string[],
  selectedFilter: string
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
