import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import 'primeicons/primeicons.css';
import { sliderData } from './sliderData'

export default function Slider(){

    const [scrollPosition, setScrollPosition] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
  

    function slideLeft(){
        setScrollPosition((prev) => prev - 500);
    }
  
    function slideRight () {
      setScrollPosition((prev) => prev + 500);
    }
  
    useEffect(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollLeft = scrollPosition;
      }
    }, [scrollPosition]);

    
  return (
    <div className='overflow-hidden mx-w-full lg:relative lg:flex '>
      <div className='items-end hidden w-1/5 pr-2 mt-1 lg:flex lg:flex-col justify-top'>
      <hr className="my-2 ml-4 h-0.5 w-4/5 bg-[#E32B31]" />
      <p className='font-roboto-condensed text-xl text-[#E32B31] text-end pt-2 mt-1'>Staff pick</p>
      </div>
      <div className='flex-col lg:hidden'>
      <hr className="my-2 ml-4 h-0.5 w-full bg-[#E32B31]" />
      <p className='font-roboto-condensed font-bold text-[#E32B31] text-2xl pl-6 mt-2 mb-6'>Staff pick</p>
      </div>
      <div className='relative flex items-center w-full pb-4 mt-2 mb-4 ml-6 mr-6 lg:w-4/5 lg:mt-8 lg:pb-2 lg:ml-1 lg:mr-8'>
      <i className="hidden lg:inline-block border-2 rounded-md border-[#E32B31] text-3xl mx-2 text-[#E32B31] pointer-events-auto pi pi-angle-left" onClick={slideLeft}></i>

        <div
        ref={sliderRef}
        className='h-full overflow-x-auto lg:w-full whitespace-nowrap scroll scroll-smooth scrollbar-hide'
        >
          {sliderData.map((item, index) => (
            <Link to={`/resource/${item._id}`} key={item._id}>
            <img
              key={index}
              className='inline-block object-contain p-2 duration-300 ease-in-out cursor-pointer w-25 h-52 hover:scale-105'
              src={item.img}
              alt='/'
            />
             </Link>
          ))}
        </div>
  
        <i className="hidden lg:inline-block border-2 rounded-md border-[#E32B31] text-3xl mx-2 text-[#E32B31] pointer-events-auto pi pi-angle-right" onClick={slideRight}></i>
      </div>
      </div>
   

  );



}