import React from 'react';
import Banner from '../Banner/Banner';
import PopularContests from '../PopularContests/PopularContests';

const HomePage = () => {
    return (
        <div className='space-y-4'>
            <Banner></Banner>
            <PopularContests></PopularContests>
        </div>
    );
};

export default HomePage;