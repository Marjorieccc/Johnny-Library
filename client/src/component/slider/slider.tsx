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
    <div className='lg:relative lg:flex w-full overflow-hidden m-0 bg-[#B80F15]'>
      <div className='flex-col items-end hidden w-1/5 p-5 mt-1 md:flex lg:flex justify-top'>
        <div className='mt-3 mb-2 text-xl text-white font-roboto-condensed'>Staff pick</div>
        <div className="flex items-center gap-2 mt-10"> 
          <i className="text-3xl text-white pointer-events-auto pi pi-angle-left" onClick={slideLeft}></i>
          <i className="text-3xl text-white pointer-events-auto pi pi-angle-right" onClick={slideRight}></i>
        </div>
      </div>

      <p className='pt-4 pb-4 pl-6 text-2xl font-bold text-white lg:hidden font-roboto-condensed'>
        Staff Pick
      </p>
      <div className='relative flex items-center w-full pb-4 mt-2 mb-4 ml-6 mr-6 lg:w-4/5 lg:mt-8 lg:pb-2 lg:ml-1 lg:mr-8 '>
        <div
        ref={sliderRef}
        className='w-full h-full overflow-x-auto whitespace-nowrap scroll scroll-smooth scrollbar-hide'
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
      </div>
      </div>
   

  );



}