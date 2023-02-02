import React, { useEffect } from 'react'
import Carousel from './carousel/Carousel'
import TrendingOffers from './trendingNfts/TrendingOffers'
import TrustedCommunities from './card/TrustedCommunities'

function Landing({ allAds, allOffers, allCommunities, currentUser, loadWeb3 }) {

    return (
        <>
            <Carousel allAds={allAds} />
            <TrustedCommunities allCommunities={allCommunities} />
            <TrendingOffers allOffers={allOffers} communities={allCommunities} />
        </>
    )
}

export default Landing