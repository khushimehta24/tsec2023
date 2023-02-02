import React, { useContext } from 'react'
import SideDrawer from '../components/Sidebar/SideDrawer'
import { Grid } from '@mui/material'
import OfferCard from '../components/landingPageComponents/card/OfferCard';
import { offerContext } from '../offerContext';
import LoginModal from '../components/landingPageComponents/modal/LoginModal';


const AllTrendingProperty = () => {
    const { allProperties } = useContext(offerContext)
    return (
        <SideDrawer>
            <Grid container sx={{ marginTop: '1%' }} spacing={2}>
                {allProperties && allProperties.map((property, index) => {

                    return <React.Fragment key={index}>
                        <Grid item md={3} xs={12}>
                            <OfferCard property={property} />
                        </Grid>
                    </React.Fragment>

                })}
            </Grid>
            <LoginModal />
        </SideDrawer>
    )
}

export default AllTrendingProperty