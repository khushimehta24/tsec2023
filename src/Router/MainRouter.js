import React, { useContext, useEffect } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { offerContext } from '../offerContext';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import DashboardPage from '../pages/DashboardPage';
import CreateOffer from '../pages/CreateOffer'
import FilterPage from '../pages/FilterPage';
import AllTrendingProperty from './../pages/AllTrendingProperty';
import Property from './../components/Property/Property';
import Manage from '../pages/Manage';

export default function MainRouter() {
    const navigate = useNavigate()
    const { user, setUser, setToken } = useContext(offerContext)

    function PrivateRouter() {
        const { user, setUser, setToken } = useContext(offerContext)
        return user !== null ? <>
            <Outlet />
        </> : <>
            {
                JSON.parse(localStorage.getItem("ccpUser")) === null && navigate('/login')
            }
            <Navigate to="/login" />
        </>
    }
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("ccpUser")))
    }, [])

    return (
        <>
            <Routes>
                <Route exact path='/' element={<DashboardPage />} />
                <Route exact path='/filter' element={<FilterPage />} /> 
                <Route exact path='/login' element={<LoginPage />} />
                <Route exact path='/signup' element={<SignupPage />} />
                <Route exact path='/create' element={<PrivateRouter />}>
                    <Route exact path='/create' element={<CreateOffer />} />
                </Route>
                <Route exact path='/offers' element={<AllTrendingProperty />} />
                <Route exact path='/propertydetails/:id' element={<Property />} />
                <Route exact path="/userprofile" element={<Manage/>} />

            </Routes>
        </>
    )
}