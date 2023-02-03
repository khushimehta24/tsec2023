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
import { async } from 'q';
import PredictServices from '../../services/PredictServices';
const Property = () => {
    const params = useParams();
    let id = params.id
    const [loading, setLoading] = useState(true)
    const [facts, setFacts] = useState({})
    console.log(id)
    const [propertyDetails, setPropertyDetails] = useState()
    useEffect(() => {
        const func = async () => {
            await PropertyServices.getOneProperty(id)
                .then(async (res) => {
                    console.log(typeof (`${res.data.data.area_location}`))
                    await PredictServices.getStats({ 'area_location': `${res.data.data.area_location}` })
                        .then((res) => {
                            console.log(res.data)
                            setFacts(res.data)
                        })
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
                        <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                            <Grid item md={6}>

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
                                                    height: '45vh'
                                                }}
                                            />
                                        </SwiperSlide>
                                    })}
                                </Swiper>
                            </Grid>
                            <Grid item md={6}>

                                <Grid container>
                                    <Grid item md={12}>
                                        <Typography variant='h5' sx={{ fontWeight: '700', padding: '1%', backgroundImage: 'linear-gradient(275.71deg, #7D93AF -50.16%, #BC09C7 124.58%)', WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} > {propertyDetails.name}</Typography>
                                    </Grid>
                                    <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                        <Typography>Area Location: {propertyDetails.area_location}</Typography>
                                        <Typography>City: {propertyDetails.city}</Typography>
                                        <Typography>Area Type: {propertyDetails.area_type}</Typography>
                                        <Typography>Rooms: {propertyDetails.bhk} BHK</Typography>
                                        <Typography>Bathrooms: {propertyDetails.bathroom} Bathrooms</Typography>
                                        <Typography>Area:  {propertyDetails.size} Sq. ft.</Typography>
                                        <Typography>Max Occupancy: {propertyDetails.max_occupants}</Typography>
                                    </Grid>
                                    <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }} >
                                        <Typography variant='h6'>Owner Details:</Typography>
                                        <Typography>Owner Name:  {propertyDetails.owner.name} </Typography>
                                        <Typography>Owner Email:  {propertyDetails.owner.email} </Typography>
                                        <Typography>Owner Number:  {propertyDetails.owner.phone} </Typography>
                                        <Typography>Point of Contact: {propertyDetails.point_of_contact}</Typography>
                                    </Grid>
                                    <Grid item md={10} sx={{ display: 'flex', padding: '2% 0', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography> Rent: {propertyDetails.rent}</Typography>
                                        <Typography>Furnishing: {propertyDetails.furnishing_status}</Typography>
                                        <Typography>Preferred Tenants: {propertyDetails.tenant_preferred}</Typography>
                                    </Grid>
                                    <Grid item md={12}>
                                        <Typography > {propertyDetails.description}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={12}>
                                <Typography variant='h5'>Some facts of this place:</Typography>
                            </Grid>
                            <Grid item md={12} sx={{ margin: '0% 5%' }}>
                                <ul>
                                    {
                                        console.log(Object.keys(facts))
                                        
                                    }
                                </ul>
                            </Grid>
                        </Grid>
                        <LoginModal />
                    </SideDrawer>
            }
        </>

    )
}

export default Property