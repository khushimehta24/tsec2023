import React, { useContext, useEffect, useState } from 'react'
import FilterOffer from '../components/Filter/FilterOffer'
import FilterSidebar from '../components/Filter/FilterSidebar'
import SideDrawer from '../components/Sidebar/SideDrawer'
import { offerContext } from '../offerContext'

function FiltersPage({ allAds, allOffers, allCommunities }) {
    const { user } = useContext(offerContext)
    const [brandName, setBrandName] = useState([])
    const [platformName, setPlatformName] = useState([])
    // console.log(allOffers, 'offer')
    useEffect(() => {
        let unique = [...new Set(allOffers.map((item) => [item.brand && item.brand.name, false]))];
        let uniqueBrandsObject = Object.fromEntries(unique)
        setBrandName(Object.keys(uniqueBrandsObject).sort().reduce(
            (obj, key) => {
                obj[key] = uniqueBrandsObject[key];
                return obj;
            },
            {}
        ));
    }, [allOffers]);
    useEffect(() => {
        let unique = [...new Set(allCommunities.map(item => [item.name, false]))];
        let uniqueBrandsObject = Object.fromEntries(unique)
        setPlatformName(uniqueBrandsObject);
    }, [allCommunities]);


    return (
        <>
            <FilterSidebar brandName={brandName} offers={allOffers} allCommunities={allCommunities} platformName={platformName}>
                <SideDrawer currentUser={user}>
                    <FilterOffer allAds={allAds} offers={allOffers} allCommunities={allCommunities} />
                </SideDrawer>
            </FilterSidebar>
        </>
    )
}

export default FiltersPage