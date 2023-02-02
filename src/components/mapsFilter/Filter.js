import { Card, CardContent, Grid } from '@mui/material'
import React from 'react'
import Map2 from '../createProperty/Map'
function Filter() {
    return (
        <Grid container columnSpacing={2} sx={{ height: '84vhvh' }}>
            <Grid item md={8} sx={{ height: '84vh', borderRadius: '10px' }}>
                <Map2 />
            </Grid>
            <Grid item md={4}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Filter