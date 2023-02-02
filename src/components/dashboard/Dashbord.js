import React, { useContext } from 'react'
import { Grid, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import { offerContext } from './../../offerContext';
import OfferCard from '../landingPageComponents/card/OfferCard';

function Dashbord() {
    const navigate = useNavigate()
    const { allProperties } = useContext(offerContext)
    return (
        <>
            <Grid sx={{ marginTop: '5%' }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid item>
                        <Typography variant='h4' sx={{ fontWeight: 'bolder', fontSize: { sm: '20px', xs: '15px' }, fontFamily: 'Poppins', margin: '0', padding: '0' }}>Trending Offers</Typography>
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