import React from 'react'
import SideDrawer from '../components/Sidebar/SideDrawer'

const LoadingPage = () => {
    return (
        <SideDrawer>
            <div style={{ display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center' }}>
                <img src="https://media.giphy.com/media/JRaDmA0FHcLtgCCV9Q/giphy.gif" style={{ objectFit: 'cover', width: '20%', display: 'block', height: '40%' }} />
            </div>
        </SideDrawer>
    )
}

export default LoadingPage