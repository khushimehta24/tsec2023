import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/swiper.min.css'
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Carousel({ pics }) {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {pics.map((pic, index) => {
                    return <SwiperSlide key={index}>
                        <img src={pic}
                            style={{
                                width: '100%',
                                height: '300px'
                            }}
                        />
                    </SwiperSlide>
                })}
            </Swiper>
        </>
    );
}