import React from 'react';
import Banner from '../Banner/Banner';
import InfoCards from '../InfoCards/InfoCards';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import Services from '../Services/Services';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
    return (
        <div className="lg:mx-5 px-2">
            <Banner />
            <InfoCards />
            <Services />
            <MakeAppointment />
            <Testimonial />
        </div>
    );
};

export default Home;