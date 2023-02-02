import React from 'react'
import SideDrawer from '../components/Sidebar/SideDrawer'

const LoadingPage = () => {
    return (
        <SideDrawer>
            <img src="https://media.giphy.com/media/rYIne3s0sf9du79AL4/giphy.gif" style={{ objectFit: 'cover', margin: '15% 40%', width: '20%', display: 'block', height: '20%' }} />
        </SideDrawer>
    )
}

export default LoadingPage