import React, { useContext, useEffect, useState } from 'react'
import SideDrawer from '../Sidebar/SideDrawer'
import { useParams } from 'react-router';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import PropertyServices from '../../services/PropertyServices';
import 'swiper/swiper.min.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Grid, Typography, CardMedia, Card, CardContent, Button, CircularProgress } from '@mui/material';
import LoadingPage from '../../pages/LoadingPage';
import LoginModal from './../landingPageComponents/modal/LoginModal';
import PredictServices from '../../services/PredictServices';
import Compatible from '../../images/Compatible.jpeg'
import AppWidgetSummary from '../AppWidgetSummary/AppWidgetSummary';
import { offerContext } from '../../offerContext';
import BusinessIcon from '@mui/icons-material/Business';
import successHandler from '../../helpers/successHandler';
import { Box } from '@mui/system';

const AddBtn = {
    color: 'white', background: '#BC09C7',
    fontFamily: 'Poppins', padding: '0px 2.6%'
}

const Property = () => {
    const params = useParams();
    let user = JSON.parse(localStorage.getItem("ccpUser"))
    const [open, setOpen] = useState(user && !user.questionnaire)
    let id = params.id
    const [loading, setLoading] = useState(true)
    const [facts, setFacts] = useState({})
    const [disable, setDisable] = useState(false)
    console.log(id)
    const [propertyDetails, setPropertyDetails] = useState()
    const token = localStorage.getItem("ccpToken")
    console.log(token, open, 'open')
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
        },
    }));
    let n = 0
    const findTrue = (a) => {
        if (a === true) {
            n = n + 1
        }
        return n
    }
    const func = async () => {
        if (token) {
            await PropertyServices.getOnePropertywithCompatibility(id, token)
                .then(async (res) => {
                    await PredictServices.getStats({ 'area_location': `${res.data.data.area_location}` })
                        .then((res) => {
                            console.log(res.data)
                            setFacts(res.data)
                        })
                    setPropertyDetails(res.data.data)
                    setLoading(false)
                    console.log(res.data.data)
                })
        }
        else {
            await PropertyServices.getOneProperty(id)
                .then(async (res) => {
                    console.log(res.data.data.area_location)
                    await PredictServices.getStats({ 'area_location': `${res.data.data.area_location}` })
                        .then((res) => {
                            console.log(res.data)
                            setFacts(res.data)
                        })
                    setDisable(user && res.data.data.interestedUsers.includes(user._id))
                    setPropertyDetails(res.data.data)
                    setLoading(false)
                })
        }
    }
    useEffect(() => {
        user && !user.questionnaire && user.questionnaire === undefined && setOpen(true)
        console.log(user)
        func()
    }, [user])
    const [loader, setLoader] = useState(false)

    const confirm = async () => {
        setLoader(true)
        await PropertyServices.confirm(id, token)
            .then((res) => {
                console.log(res);
                setLoader(false)
                successHandler("Owner will reach out to you soon")
            }).catch((e) => {
                setLoader(false)
                console.log(e)
            })
    }

    return (
        <>
            {
                loading ? <LoadingPage /> :
                    <SideDrawer >
                        <Card>
                            <CardContent>
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
                                {
                                    user.verified.phone && user.verified.email && user.verified.pan && loader ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <CircularProgress sx={{ backgroundColor: '#BC09C7', color: 'white', padding: '5px', borderRadius: '50%' }} />
                                    </Box> : <Button disabled={disable} onClick={confirm} sx={{ textTransform: 'none', marginTop: '3%', height: '2.5rem', width: '100%', border: '2px solid #BC09C7', '&:hover': { border: '2px solid #BC09C7 !important', backgroundColor: 'white !important', color: '#BC09C7 !important' }, ...AddBtn }} > Confirm</Button>
                                }
                            </CardContent>
                        </Card>
                        <Grid container sx={{ margin: '3%' }}>
                            <Grid item container md={6}>
                                <Typography variant='h5'>Some facts of this place:</Typography>
                                <Grid container item md={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Grid item md={6}>
                                        <Card>
                                            <CardContent>
                                                <h4>Crime Rate</h4>
                                                <Typography variant='p' style={{ width: '8px', textAlign: 'justify' }}>{facts.crime_rate}</Typography>

                                            </CardContent>
                                        </Card>

                                    </Grid>
                                    <Grid item md={6}>
                                        <Card>
                                            <CardContent>
                                                <h4>Cost of living</h4>
                                                <Typography variant='p' style={{ width: '8px', textAlign: 'justify' }}>{facts.cost_of_living}</Typography>

                                            </CardContent>
                                        </Card>

                                    </Grid>
                                    <Grid item md={12}>
                                        <Card sx={{ width: '100%' }}>
                                            <CardContent sx={{ width: '100%' }}>
                                                <h4>NearBy Colleges</h4>
                                                {
                                                    facts.colleges.map((i) => {
                                                        return <div style={{ display: 'flex', width: '100%' }}>
                                                            <BusinessIcon />
                                                            <Typography variant='p' style={{ width: '8px', textAlign: 'justify' }}>{i}</Typography>

                                                        </div>
                                                    })
                                                }

                                            </CardContent>
                                        </Card>

                                    </Grid>
                                    {/* {
                                        Object.values(facts).map((fact) => {
                                            return <Grid item xs={12} sm={6} md={6}>
                                                <Typography></Typography>
                                            </Grid>
                                        })

                                    } */}
                                </Grid>
                            </Grid>
                            <Grid item md={1} />
                            <Grid item md={5}>
                                <Typography variant='h5'>Tenants</Typography>
                                {
                                    propertyDetails.tenants.map((tenant) => {
                                        return <Card sx={{ maxWidth: 345 }}>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {tenant.name}
                                                </Typography>
                                                <Typography>Verifed</Typography>
                                                <BorderLinearProgress variant="determinate" value={100} sx={{ margin: '5%' }} />
                                                <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>Compatibility Score <strong>{tenant.compatibilityScore}%</strong></Typography>
                                                <BorderLinearProgress backgroundColor='red' variant="determinate" value={tenant.compatibilityScore} sx={{ margin: '5%' }} />
                                                <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>

                                                    <Card sx={{ maxWidth: 120, padding: '2%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                                        <img src={Compatible} alt="emote" width={30} height={30} />
                                                        <Typography sx={{ textAlign: 'center' }}>{tenant.compatibleResponses.length} Compatible Answers</Typography>
                                                    </Card>
                                                    <Card sx={{ maxWidth: 120, padding: '2%' }}>
                                                        <Typography>Icon</Typography>
                                                        <Typography>{tenant.differentResponses.length} Different Answers</Typography>
                                                    </Card>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    })
                                }
                            </Grid>
                        </Grid>
                    </SideDrawer>

            }
            <LoginModal open={open} setOpen={setOpen} />
        </>
    )
}

export default Property