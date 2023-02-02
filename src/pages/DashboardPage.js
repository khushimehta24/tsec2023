import React from 'react'
import Dashbord from '../components/dashboard/Dashbord'
import SideDrawer from '../components/Sidebar/SideDrawer'

function DashboardPage() {
    return (
        <SideDrawer>
            <Dashbord />
        </SideDrawer>
    )
}

export default DashboardPage