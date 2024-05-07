import React, { useState } from 'react'
import 'primeicons/primeicons.css';

export default function Carousel(){
    const [curr, setCurr] = useState(0);
    const [applyTransition, setApplyTransition] = useState(true); 
    const slides = [
      "./carousel_1.webp",
      "./carousel_2.webp",
      "./carousel_3.webp",
      "./carousel_4.webp",
      "./carousel_1.webp",
    ]


    function prev(){
        const prevIndex = curr === 0 ? slides.length - 1 : curr - 1;
        if (slides[curr] !== slides[prevIndex]) {
            setApplyTransition(true);
        } else {
            setApplyTransition(false);
        }
        setCurr(prevIndex);
    }

    function next (){
        const nextIndex = curr === slides.length - 1 ? 0 : curr + 1;
        if (slides[curr]!== slides[nextIndex]) {
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
          {slides.map((image, index) => (
            <div key={index} className="flex flex-shrink-0 w-full">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-auto" />
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
        <div className='absolute left-0 right-0 bottom-4'>
          <div className='flex items-center justify-center gap-2'>
            {slides.map((_, i) => (
              <div key={i} className={`transition-all w-1.5 h-1.5 bg-white rounded-full ${curr === i ? "p-0.5" : "bg-opacity-50"}`} />
            ))}
          </div>
        </div>
   
      </div>
    );
}

