import React from 'react';
import Slider from '../component/slider/Slider';
import Carousel from '../component/carousel/Carousel';
import SpotlightEvent from '../component/spotlightEvent/SpotlightEvent';

export default function HomeContent() {
  return (
    <div>
      <section className='mb-5 '>
        <Carousel />
      </section>
      <section className='my-28'>
        <SpotlightEvent />
      </section>
      <section className='my-28'>
        <Slider />
      </section>
    </div>
  );
}
