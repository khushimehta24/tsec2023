import React, { useContext } from 'react'
import { Grid, Button, Typography, CardMedia } from '@mui/material'
import { useNavigate } from 'react-router'
import { offerContext } from './../../offerContext';
import OfferCard from '../landingPageComponents/card/OfferCard';
import banner from '../../images/banner.png'
function Dashbord() {
    const navigate = useNavigate()
    const { allProperties } = useContext(offerContext)
    return (
        <>
            <Grid >
                <CardMedia component='img' image={banner} />

                <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid item>
                        <Typography variant='h4' sx={{ fontWeight: 'bolder', fontSize: { sm: '20px', xs: '15px' }, fontFamily: 'Poppins', marginTop: '13%', padding: '0' }}>Trending Properties</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => navigate('/offers')}>Show More</Button>
                    </Grid>
                </Grid>
                <Grid container sx={{ marginTop: '1%' }} spacing={2}>
                    {allProperties && allProperties.map((property, index) => {
                        if (index < 4) {
                            return <React.Fragment key={index}>
                                <Grid item md={3} xs={12}>
                                    <OfferCard property={property} />
                                </Grid>
                            </React.Fragment>
                        }
                    })}
                </Grid>
            </Grid>
        </>
    )
}

export default Dashbord