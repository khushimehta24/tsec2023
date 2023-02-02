import { Button, Grid, Typography } from '@mui/material'
import moment from 'moment';
import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { offerContext } from '../../../offerContext';
import OfferCard from '../card/OfferCard';

function TrendingOffers({ allOffers, communities }) {
    const { eligible } = useContext(offerContext)
    const navigate = useNavigate()
    const checkStatus = (i) => {
        const now = moment().unix();
        let stats

        if (now > i.endsAt) {
            stats = "Expired"
        }
        else if (i.startsAt > now) {
            stats = "Upcoming";
        }

        else if (i.startsAt <= now <= i.endsAt) {
            stats = "Active";
        }
        return stats
    }
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
                    {allOffers && allOffers.filter(i => checkStatus(i) !== "Expired").map((offer, index) => {
                        if (index < 4) {
                            return <React.Fragment key={index}>
                                <Grid item md={3} xs={12}>
                                    <OfferCard offer={offer} communities={communities} />
                                </Grid>
                            </React.Fragment>
                        }
                    })}
                </Grid>
            </Grid>

        </>
    )
}

export default TrendingOffers