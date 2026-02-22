import React from 'react';
import Banner from '../Banner/Banner';
import PopularContests from '../PopularContests/PopularContests';
import ExtraSection from '../ExtraSection/ExtraSection';
import Reviews from '../Reviews/Reviews';

const HomePage = () => {
    return (
        <div className='space-y-4'>
            <Banner></Banner>
            <PopularContests></PopularContests>
            <ExtraSection></ExtraSection>
            <Reviews></Reviews>
        </div>
    );
};

export default HomePage;