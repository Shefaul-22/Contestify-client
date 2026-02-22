import React from 'react';

const Banner = () => {
    return (
        <div className='w-full'>

            <div className='relative'>
                <img src="https://i.ibb.co.com/DH570fqD/image.png" className='w-full h-80 md:h-auto object-cover' />
                <div className="absolute inset-0 flex gap-4 top-[5%] left-3/5 -translate-x-1/2 ">
                    <button className='btn bg-error text-md md:text-xl' >Join , Compete , Learn & Win</button>

                </div>

            </div>

        </div>
    );
};

export default Banner;