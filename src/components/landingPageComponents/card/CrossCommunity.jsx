import { Grid, Typography } from '@mui/material'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import OfferCard from './OfferCard';

function CrossCommunity({ allOffers, communities }) {

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

    const [crossOffers, setCrossOffers] = useState(allOffers);
    useEffect(() => {
        if (allOffers) {
            let cross = allOffers.filter(x => x.targetCommunities.length > 1)
            setCrossOffers(cross);
        }
    }, [allOffers])

    return (
        <>
            <Grid sx={{ marginTop: '5%' }}>
                <Typography variant='p' sx={{ fontSize: '12px', fontFamily: 'Poppins', margin: '0', padding: '0' }}>Best offers of the week</Typography>
                <Typography variant='h4' sx={{ fontWeight: 'bolder', fontSize: { sm: '20px', xs: '15px' }, fontFamily: 'Poppins', margin: '0', padding: '0' }}>Cross Offers</Typography>
                <Grid container sx={{ marginTop: '1%' }} spacing={5}>
                    {crossOffers && crossOffers.filter(i => checkStatus(i) !== "Expired").map((offer, index) => {
                        return <React.Fragment key={index}>
                            {/* <Grid item md={3} xs={4}>
                                <OfferCard offer={offer} communities={communities} />
                            </Grid> */}
                        </React.Fragment>
                    })}
                </Grid>
            </Grid>
        </>
    )
}

export default CrossCommunity