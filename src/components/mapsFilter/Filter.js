import { Card, CardContent, CardMedia, Chip, Grid, Rating } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { offerContext } from '../../offerContext'
import Map2 from '../createProperty/Map'
import StarIcon from '@mui/icons-material/Star';
import PropertyServices from '../../services/PropertyServices';
import { useNavigate } from 'react-router';

function Filter() {
    const { allProperties } = useContext(offerContext)
    const [prop2, setProp2] = useState(allProperties)
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const navigate = useNavigate()
    // useEffect(() => {
    //     const func = async () => {
    //         await PropertyServices.getPropertiesByCoOrd(lat, lon)
    //             .then((res) => {
    //                 console.log(res);
    //                 setProp2(res.data.data)
    //             }).catch((e) => {
    //                 console.log(e)
    //             })
    //     }
    //     func()
    // }, [lat, lon])

    return (<>
        <Grid container row columnSpacing={2} sx={{ height: '84vh' }}>
            <Grid item md={8} sx={{ height: '84vh', borderRadius: '10px' }}>
                <Map2 setLat={setLat} setLon={setLon} setProp2={setProp2} />
            </Grid>
            <Grid item container rowSpacing={2} md={4} sx={{ height: '84vh', overflow: 'scroll', "&::-webkit-scrollbar": { display: 'none' } }} >

                {
                    prop2.map((property, index) => {
                        return <Grid item sx={{ width: '100%' }} >
                            <Card sx={{ borderRadius: '10px' }} onClick={() => navigate(`/propertydetails/${property._id}`)}>
                                <CardContent>
                                    <Grid container columnSpacing={2}>
                                        <Grid item md={4}>
                                            <CardMedia sx={{ borderRadius: '5px', width: '100%', height: '7rem' }} component='img' image={property.pictures[0]} />
                                        </Grid>
                                        <Grid item md={8}>
                                            <h5>{property.name}</h5>
                                            <p style={{ fontSize: '12px' }}>{property.description}</p>
                                            <Rating
                                                name="text-feedback"
                                                readOnly
                                                value={Math.floor(Math.random() * (5 - 0 + 1) + 0)}
                                                precision={0.5}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />
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