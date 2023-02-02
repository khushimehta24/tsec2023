import React from 'react'
import Login from '../components/auth/Login'
import SideDrawer from '../components/Sidebar/SideDrawer'

function LoginPage() {
    return (
        <>
            <SideDrawer>
                <Login />
            </SideDrawer>
        </>
    )
}

export default LoginPage