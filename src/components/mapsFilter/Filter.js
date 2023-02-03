import { Card, CardContent, CardMedia, Grid } from '@mui/material'
import React, { useContext } from 'react'
import { offerContext } from '../../offerContext'
import Map2 from '../createProperty/Map'
function Filter() {
    const { allProperties } = useContext(offerContext)

    return (<>
        <Grid container row columnSpacing={2} sx={{ height: '84vh' }}>
            <Grid item md={8} sx={{ height: '84vh', borderRadius: '10px' }}>
                <Map2 />
            </Grid>
            <Grid item container rowSpacing={2} md={4} sx={{ height: '84vh', overflow: 'scroll', "&::-webkit-scrollbar": { display: 'none' } }} >

                {
                    allProperties.map((property, index) => {
                        return <Grid item sx={{ width: '100%' }}>
                            <Card sx={{ borderRadius: '10px' }}>
                                <CardContent>
                                    <Grid container columnSpacing={2}>
                                        <Grid item md={4}>
                                            <CardMedia sx={{ borderRadius: '5px', width: '100%', height: '7rem' }} component='img' image={property.pictures[0]} />
                                        </Grid>
                                        <Grid item md={8}>
                                            <h5>{property.name}</h5>
                                            <p style={{ fontSize: '12px' }}>{property.description}</p>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    })
                }
            </Grid>
        </Grid>
    </>
    )
}

export default Filter