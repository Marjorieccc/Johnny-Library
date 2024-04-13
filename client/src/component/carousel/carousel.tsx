import React, { useState } from 'react'
import 'primeicons/primeicons.css';
import { carouselImage } from './carouselData';


export default function Carousel(){
    const [curr, setCurr] = useState(0);
    const [applyTransition, setApplyTransition] = useState(true);


    function prev(){
        const prevIndex = curr === 0 ? carouselImage.length - 1 : curr - 1;
        if (carouselImage[curr].id !== carouselImage[prevIndex].id) {
            setApplyTransition(true);
        } else {
            setApplyTransition(false);
        }
        setCurr(prevIndex);
    }

    function next (){
        const nextIndex = curr === carouselImage.length - 1 ? 0 : curr + 1;
        if (carouselImage[curr].id !== carouselImage[nextIndex].id) {
          setApplyTransition(true);
        } else {
          setApplyTransition(false);
        }
        setCurr(nextIndex);
    }

    return (
        <div className='relative overflow-hidden '> 
            <div
                className={`flex ${applyTransition ? 'transition-transform ease-out duration-500' : ''}`}
                style={{ transform: `translateX(-${curr * 100}%)` }}
            >
          {carouselImage.map((image, index) => (
            <div key={index} className="flex flex-shrink-0 w-full">
            <img src={image.img} alt={`Slide ${index + 1}`} className="w-full h-auto" />
          </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button onClick={prev} className='p-1 text-gray-800 rounded-full '>
            <i className="text-2xl text-white border-2 rounded-full pi pi-angle-left lg:"></i>
          </button>
          <button onClick={next} className='p-1 text-gray-800 rounded-full'>
            <span className="text-2xl text-white border-2 rounded-full pi pi-angle-right"></span>
          </button>
        </div>
      </div>
    );
}

