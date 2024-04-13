import React from "react";
import Slider from "../component/slider/slider";
import Carousel from "../component/carousel/carousel";
import SpotlightEvent from "../component/spotlightEvent/spotlightEvent";


export default function HomeContent(){
    return(
        <div >
            <section className='mb-10 '><Carousel/></section> 
            <section className='my-28'><SpotlightEvent /></section>
            <section className='my-28'><Slider/></section>
        </div>
    );
}