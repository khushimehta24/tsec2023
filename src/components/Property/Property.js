import React, { useEffect, useState } from 'react'
import SideDrawer from '../Sidebar/SideDrawer'
import { useParams } from 'react-router';
import PropertyServices from '../../services/PropertyServices';
import 'swiper/swiper.min.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Grid, Typography } from '@mui/material';
import LoadingPage from '../../pages/LoadingPage';
import LoginModal from './../landingPageComponents/modal/LoginModal';
const Property = () => {
    const params = useParams();
    let id = params.id
    const [loading, setLoading] = useState(true)
    console.log(id)
    const [propertyDetails, setPropertyDetails] = useState()
    useEffect(() => {
        const func = async () => {
            await PropertyServices.getOneProperty(id)
                .then((res) => {
                    console.log(res.data.data)
                    setPropertyDetails(res.data.data)
                    setLoading(false)
                })
        }
        func()
    }, [])
    return (
        <>
            {
                loading ? <LoadingPage /> :
                    <SideDrawer >
                        <Typography variant='h5' sx={{ fontWeight: '700', padding: '1%', backgroundImage: 'linear-gradient(275.71deg, #7D93AF -50.16%, #BC09C7 124.58%)', WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} > {propertyDetails.name}</Typography>

                        <Swiper
                            style={{ marginRight: '3%' }}
                            spaceBetween={30}
                            slidesPerView={2}
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
                            {propertyDetails.pictures.map((pic, index) => {
                                return <SwiperSlide key={index}>
                                    <img src={pic}
                                        style={{
                                            width: '100%',
                                            height: '400px'
                                        }}
                                    />
                                </SwiperSlide>
                            })}
                        </Swiper>
                        <Grid container>
                            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography>Area Location: {propertyDetails.area_location}</Typography>
                                <Typography>City: {propertyDetails.city}</Typography>
                            </Grid>
                            <Grid item xs={6} />
                            <Grid item xs={6}>

                            </Grid>
                        </Grid>
                        <LoginModal/>
                    </SideDrawer>
            }
        </>

    )
}

export default Property