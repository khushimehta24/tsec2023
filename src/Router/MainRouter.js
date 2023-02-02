import React, { useContext, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { offerContext } from '../offerContext';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

export default function MainRouter() {
    // function PrivateRouter() {
    //     const { user, setUser, setOpen } = useContext(offerContext)
    //     return user !== null ? <>
    //         <Outlet />
    //     </> : <>
    //         {
    //             JSON.parse(localStorage.getItem("ccpUser")) === null && setOpen(true)
    //         }
    //         <Navigate to="/" />
    //     </>
    // }
    // const { offerId, userCreatedOffers, setUserCreatedOffers, setClaimed, claimed, setFav, fav, NFTs, setNFTs, userBrand, setUserBrand, summary, setSummary, allBrands, setAllBrands, setOfferId, user, setUser, account, setAccount, allOffers, allCommunities, token, setToken, loadingProfileOffer, setLoadingProfileOffer, allAds, createOfferFromApp, buyOfferFromApp, offerSummary } = useContext(offerContext)
    // useEffect(() => {
    //     setUser(JSON.parse(localStorage.getItem("ccpUser")))
    // }, [])

    return (
        <>
            <Routes>
                <Route exact path='/' element={<LoginPage />} />
                <Route exact path='/signup' element={<SignupPage />} />

            </Routes>
        </>
    )
}