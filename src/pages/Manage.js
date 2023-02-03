import React, { useContext, useEffect, useState } from 'react'
import SideDrawer from '../components/Sidebar/SideDrawer'
import { offerContext } from '../offerContext'
import { getMyProperties } from '../services/api'
import { Grid } from '@mui/material'
import OfferCard from '../components/landingPageComponents/card/OfferCard';
import ViewUsers from '../components/manage/ViewUsers'
function Manage() {
    const { user } = useContext(offerContext)

    const [properties, setProperties] = useState([])

    const getPropertiesFn = async () => {
        const res = await getMyProperties(localStorage.getItem("ccpToken"))
        console.log(res)
        setProperties(res.data)
    }
    useEffect(() => {
        getPropertiesFn();
    }, [])
    return (
        <>
            <SideDrawer currentUser={user}>
            <ViewUsers/>
            <h2>My Properties</h2>
            <Grid container sx={{ marginTop: '1%' }} spacing={2}>
                {properties && properties.map((property, index) => {

                    return <React.Fragment key={index}>
                        <Grid item md={3} xs={12}>
                            <OfferCard property={property} />
                        </Grid>
                    </React.Fragment>

                })}
            </Grid>
            </SideDrawer>
        </>
    )
}
export default Manage