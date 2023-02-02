import React from "react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import '../../../assets/Carousel.css'
import { CardMedia, Grid } from "@mui/material";
import banner from '../../../images/banner.jpg'
import { useNavigate } from "react-router";
const swipeStyle = { width: '100%', height: '50%', display: 'flex', justifyContent: 'center' }
const gridContainer = { display: 'flex', width: { md: '100%', sm: '100%', xs: '87vw' }, justifyContent: 'center' }

export default function Carousel({ allAds }) {
    const navigate = useNavigate()
    return (
        <>
            <Grid container sx={gridContainer} onClick={() => navigate('/addtoipfs')}>
                {/* <Swiper
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                    style={swipeStyle}
                >
                    <SwiperSlide>
                        <img src={img1} style={{ width: '100%', height: 'auto' }} />
                    </SwiperSlide>

                </Swiper> */}
                <CardMedia component='img' alt="banner" image={banner} />
            </Grid>
        </>
    );
}
