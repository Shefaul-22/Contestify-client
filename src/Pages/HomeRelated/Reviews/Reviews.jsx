import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import ReviewCard from "./ReviewCard";

const Reviews = () => {


    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("/reviews.json")
            .then((res) => res.json())
            .then((data) => {

                // console.log(data);

                setReviews(data)
            });
    }, []);

    return (
        <div className="py-16 bg-gray-50">
            <div className="text-center mb-12 space-y-4 px-4">
                <h2 className="text-xl md:text-4xl font-bold">What our participants say</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    Real experiences from winners and participants of Contestify. See how contests
                    helped them learn, compete, and succeed.
                </p>
            </div>

            {reviews.length > 0 && (
                <Swiper
                    loop
                    effect="coverflow"
                    grabCursor
                    centeredSlides
                    slidesPerView={1.2}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    coverflowEffect={{
                        rotate: 15,
                        stretch: 30,
                        scale: 0.75,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    pagination
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id}>
                            <ReviewCard review={review} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default Reviews;