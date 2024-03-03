import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from "react-router-dom";
import SideBarFilter from '../component/sideBar/sideBarFilter';
import ResourceList from '../component/resources/resourceList';
import { Resource, IResource, fetchByFilter, fetchBySearchTerm } from '../api/fetch';

export default function ExplorePage() {
  const [selectFilter, setSelectFilter] = useState<string[][]>([[],[],[]]);
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || '';

  // ----------- Filter Selected Resources -----------
  const {data: resourceList} = useQuery({
    queryKey:['resourceList'],
    queryFn:()=> fetchByFilter()
  })
  // function filteredResources() {
    
  // }

    // ----------- Query resources with matching titles -----------
    const { data: searchData, isLoading: searchLoading, error: searchError } = useQuery<IResource[]>({
      queryKey: ['searchResults', searchTerm],
      queryFn: () => fetchBySearchTerm(searchTerm),
      enabled: !!searchTerm, 
    });

  return (
    <>
      <SideBarFilter selectFilter={selectFilter} setSelectFilter={setSelectFilter}/>
      {searchLoading && <div>Search Loading...</div>}
      {searchError &&<div>Error: {searchError.message}</div>}
      {searchData && searchData.map((resource) => (
        <p key={resource._id} className="text-sm text-gray-900">{resource.title}</p>))}
      {resourceList && <ResourceList resourceList={resourceList}/>}
    </>
  );
}
