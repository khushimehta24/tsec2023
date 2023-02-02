import React, { useContext } from 'react'
import Landing from '../components/landingPageComponents/Landing'
import SideDrawer from '../components/Sidebar/SideDrawer'
import { offerContext } from '../offerContext'

function LandingPage({ allAds, allOffers, allCommunities, offers, loadWeb3 }) {
    const { user } = useContext(offerContext)
    return (
        <>
            <SideDrawer currentUser={user} loadWeb3={loadWeb3}>
                <Landing allAds={allAds} allOffers={allOffers} allCommunities={allCommunities} offers={offers} currentUser={user} loadWeb3={loadWeb3} />
            </SideDrawer>
        </>
    )
}
export default LandingPage