import React, { useState, useEffect, useRef } from 'react';
import { spotEvent } from './spotlightEventData';

export default function SpotlightEvent(){
    return (
        <>
            <div className='overflow-hidden lg:flex'>
                <div className='items-end hidden w-1/5 pr-2 mt-1 lg:flex lg:flex-col justify-top'>
                    <hr className="my-2 ml-4 h-0.5 w-4/5 bg-[#E32B31]" />
                    <p className='font-roboto-condensed text-xl text-[#E32B31] text-end pt-2 mt-1'>Spotlight</p>
                </div>
                <div className='flex-col lg:hidden'>
                    <hr className="my-2 ml-4 h-0.5 w-full bg-[#E32B31]" />
                    <p className='font-roboto-condensed font-bold text-[#E32B31] text-2xl pl-6 mt-2 mb-6'>Spotlight</p>
                </div>
                <div className='grid w-full grid-cols-1 px-3 lg:w-4/5 lg:grid-cols-4 gap-x-px gap-y-10 lg:gap-y-6 lg:mt-2 lg:pr-10'>
                    {spotEvent.map((item, index) => (
                        <div key={index} className='px-4'>
                            <img
                            className='hover:scale-105'
                            src={item.img}
                            alt='/'
                            />
                            <p className='px-2 py-2 font-robot'>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex justify-center my-10'>
                <button className='border-2 rounded-full border-[#E32B31]  px-6 py-4 text-[#E32B31]'>SEE MORE ...</button>
            </div>
        </>
    );
    
}