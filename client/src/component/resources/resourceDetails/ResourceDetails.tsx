import React from "react";
import "primeicons/primeicons.css";
import { useNavigate } from "react-router-dom";
import { Resource } from "../../../types/resourceType";
import Tab from "./Tab";

export default function ResourceDetails({ resource }: { resource: Resource }) {

  const navigate = useNavigate();
  
  return (
    <div className="flex-col py-4 mx-auto lg:w-2/3 font-robot">
      <div className="justify-center lg:flex lg:justify-start">
        <div className="mx-auto bg-gray-100 lg:mx-2 lg:py-8 lg:w-96 lg:px-0 lg:h-96 h-80 w-80" >
            <img
              src={resource.thumbnail_url}
              alt={resource.title}
              className="object-cover w-48 mx-auto border-gray-200 lg:h-auto border-1 lg:w-60"
            />
        </div>
        <div className="mx-auto lg:mx-10 lg:flex-col">
          <div className="justify-center mt-10 mb-2 lg:flex lg:mt-2 lg:mb-2 lg:justify-start">
          <h1 className="mt-10 text-2xl font-bold text-center lg:mt-0 lg:mb-4 lg:text-start">{resource.title}</h1>
          <span
            className="flex justify-center mt-2 lg:mx-2 pi pi-arrow-circle-left text-[#E32B31] hover:text-red-800"
            style={{ fontSize: "1.5rem" }}
            onClick={() => navigate(-1)}
          ></span>
          </div>
          <div className="lg:flex-col lg:w-72">
            <div className="flex justify-center mt-10 mb-2 lg:mt-2 lg:mb-2 lg:justify-start">
              <i className="text-xl text-[#E32B31] pi pi-users"></i>
              <p className="px-4 text-base font-bold lg:mb-0">Audience</p>
            </div>
            <p className="mb-10 text-base text-center text-gray-500 lg:text-start lg:px-10 lg:mb-6">{resource.audience}</p>
          </div>
          <div className="lg:flex-col">
            <div className="flex justify-center my-2 lg:my-4 lg:justify-start">
              <i className="text-xl text-[#E32B31] pi pi-th-large"></i>
              <p className="px-4 mb-4 text-base font-bold lg:mb-0">Categories</p>
            </div>
            <div className="px-24 mb-10 lg:px-10 lg:flex lg:gap-x-4 text-nowrap">
              {resource.category?.map((category) => (
              <div className="my-4 text-center text-gray-500 rounded-md lg:py-1 lg:text-sm lg:border lg:px-2 lg:my-0" 
                  key={category}>{category}</div>
              ))}   
            </div>
          </div>
          <div className="flex justify-center my-2 lg:flex-col lg:max-w-96">
            <Tab resource={resource} />
          </div>
        </div>
      </div>
      <h1 className="my-6 text-xl font-bold text-center lg:text-start lg:mx-0">Overview: </h1>
      <div className="mx-10 text-justify text-gray-500 ading-loose lg:mx-0">{resource.longDescription}</div>
    </div>
  );
}
