import React from "react";
import { Link } from "react-router-dom";
import { Resource } from "../../types/resource";
import 'primeicons/primeicons.css';

export default function ResourceCard({resource}: {resource: Resource}) {
  return (
    <div className="mb-2 font-roboto-condensed">
      <div className="flex flex-col bg-gray-200 p-4 w-72 h-72 lg:w-3/4 lg:h-3/4 items-center" >
      <img src={resource.thumbnail_url} alt={resource.title} 
           className="mx-12 my-4 w-32 h-48 object-cover"/>
      </div>
      <div>
      <Link to={`/resource/${resource._id}`}>
        <p className="text-sm flex ">{resource.title}</p></Link>
        <div className="flex flex-wrap gap-4 ">
          {resource.medium.map((mediumItem, index) => (
            <p key={index} className="text-slate-500 text-xs py-1 mb-1">
              {mediumItem.return_date==null?
              <i className="pi pi-check mr-1"></i> : <i className="pi pi-times  mr-1"></i>
              }
              {mediumItem.format}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
