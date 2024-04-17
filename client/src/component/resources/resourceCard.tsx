import React from "react";
import { Link } from "react-router-dom";
import { Resource } from "../../types/resourceType";
import 'primeicons/primeicons.css';

export default function ResourceCard({resource}: {resource: Resource}) {
  return (
    <Link to={`/resource/${resource._id}`} key={resource._id}>
    <div className="font-roboto-condensed">
      <div className="items-center py-8 bg-gray-100 px-14 max-w-72 min-w-32" >
        <img src={resource.thumbnail_url} alt={resource.title} 
           className="object-cover w-32 h-48 min-w-16 min-h-24"/>
      </div>
      <div>
        <p className="max-w-xs pt-2 text-sm break-words">{resource.title}</p>
        <div className="flex flex-wrap gap-4 ">
          {resource.medium.map((mediumItem, index) => (
            <p key={index} className="py-1 mb-1 text-xs text-slate-500">
              {mediumItem.return_date==null?
              <i className="mr-1 pi pi-check"></i> : <i className="mr-1 pi pi-times"></i>
              }
              {mediumItem.format}
            </p>
          ))}
        </div>
      </div>
    </div>
    </Link>
  )
}
