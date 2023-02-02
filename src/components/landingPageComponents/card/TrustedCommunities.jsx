import { Badge, Card, CardContent, CardMedia, Divider, Grid, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router';

const style = {
    heading: { margin: '0px', color: '#292D32', fontFamily: 'Poppins', fontWeight: 'bolder', padding: '0px', fontSize: { sm: '15px', xs: '8px' }, display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' },
    p: { margin: '0px', color: '#636363', fontFamily: 'Poppins', fontSize: { md: '10px', sm: '8px', xs: '6px' }, padding: '0px' },
    communityImg: { width: { md: '80px', sm: '50px', xs: '30px' }, border: '2px solid black', height: { md: '80px', sm: '50px', xs: '30px' }, borderRadius: '50%', display: 'flex', justifyContent: 'center' },
    nickname: { fontSize: { md: '12px', xs: '7px' }, margin: 0, padding: '0', fontWeight: 'bold' },
}

function TrustedCommunities({ allCommunities }) {
    // console.log(allCommunities, 'resdata');
    const navigate = useNavigate()
    return (
        <>
            <Grid sx={{ marginTop: '4%' }}>
                <Typography variant='h4' sx={{ fontWeight: 'bolder', fontSize: { sm: '20px', xs: '15px' }, fontFamily: 'Poppins', margin: '0', padding: '0' }}>Trusted Communities</Typography>
                <Grid container spacing={1} sx={{ height: '100%', marginTop: '1%' }}>
                    {allCommunities && allCommunities.map((community, index) => {
                        return (<Grid item key={index} onClick={() => navigate(`/communitydetails/${community._id}`, { state: { id: community._id } })} md={1.5} xs={2} sx={{ width: '100%', height: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
                            <Tooltip title={community.name}>
                                <CardMedia component='img' sx={style.communityImg} image={community.img} style={{ objectFit: "contain" }} />
                            </Tooltip>
                        </Grid>)
                    })}
                </Grid>
            </Grid>
        </>
    )
}

export default TrustedCommunities